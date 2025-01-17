/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

jest.mock('./overwritten_session_page');

import type { AppMount } from 'src/core/public';
import { coreMock, scopedHistoryMock, themeServiceMock } from 'src/core/public/mocks';

import { securityMock } from '../../mocks';
import { overwrittenSessionApp } from './overwritten_session_app';

describe('overwrittenSessionApp', () => {
  it('properly registers application', () => {
    const coreSetupMock = coreMock.createSetup();

    overwrittenSessionApp.create({
      application: coreSetupMock.application,
      getStartServices: coreSetupMock.getStartServices,
      authc: securityMock.createSetup().authc,
    });

    expect(coreSetupMock.application.register).toHaveBeenCalledTimes(1);

    const [[appRegistration]] = coreSetupMock.application.register.mock.calls;
    expect(appRegistration).toEqual({
      id: 'security_overwritten_session',
      title: 'Overwritten Session',
      chromeless: true,
      appRoute: '/security/overwritten_session',
      mount: expect.any(Function),
    });
  });

  it('properly sets breadcrumbs and renders application', async () => {
    const coreSetupMock = coreMock.createSetup();
    const coreStartMock = coreMock.createStart();
    coreSetupMock.getStartServices.mockResolvedValue([coreStartMock, {}, {}]);

    const authcMock = securityMock.createSetup().authc;
    const containerMock = document.createElement('div');

    overwrittenSessionApp.create({
      application: coreSetupMock.application,
      getStartServices: coreSetupMock.getStartServices,
      authc: authcMock,
    });

    const [[{ mount }]] = coreSetupMock.application.register.mock.calls;
    await (mount as AppMount)({
      element: containerMock,
      appBasePath: '',
      onAppLeave: jest.fn(),
      setHeaderActionMenu: jest.fn(),
      history: scopedHistoryMock.create(),
      theme$: themeServiceMock.createTheme$(),
    });

    const mockRenderApp = jest.requireMock(
      './overwritten_session_page'
    ).renderOverwrittenSessionPage;
    expect(mockRenderApp).toHaveBeenCalledTimes(1);
    expect(mockRenderApp).toHaveBeenCalledWith(coreStartMock.i18n, containerMock, {
      authc: authcMock,
      basePath: coreStartMock.http.basePath,
    });
  });
});
