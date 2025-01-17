/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { Fragment, useState } from 'react';
import { FormattedMessage } from '@kbn/i18n/react';
import {
  EuiButton,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiSpacer,
} from '@elastic/eui';
import { SnapshotDetails, RestoreSettings } from '../../../../common/types';
import { RestoreValidation, validateRestore } from '../../services/validation';
import {
  RestoreSnapshotStepLogistics,
  RestoreSnapshotStepSettings,
  RestoreSnapshotStepReview,
} from './steps';
import { RestoreSnapshotNavigation } from './navigation';

interface Props {
  snapshotDetails: SnapshotDetails;
  isSaving: boolean;
  saveError?: React.ReactNode;
  clearSaveError: () => void;
  onSave: (repository: RestoreSettings) => void;
}

export const RestoreSnapshotForm: React.FunctionComponent<Props> = ({
  snapshotDetails,
  isSaving,
  saveError,
  clearSaveError,
  onSave,
}) => {
  // Step state
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [maxCompletedStep, setMaxCompletedStep] = useState<number>(0);
  const stepMap: { [key: number]: any } = {
    1: RestoreSnapshotStepLogistics,
    2: RestoreSnapshotStepSettings,
    3: RestoreSnapshotStepReview,
  };
  const CurrentStepForm = stepMap[currentStep];

  // Restore details state
  const [restoreSettings, setRestoreSettings] = useState<RestoreSettings>({});

  // Restore validation state
  const [validation, setValidation] = useState<RestoreValidation>({
    isValid: true,
    errors: {},
  });

  const updateRestoreSettings = (updatedSettings: Partial<RestoreSettings>): void => {
    const newRestoreSettings = { ...restoreSettings, ...updatedSettings };
    const newValidation = validateRestore(newRestoreSettings);
    setRestoreSettings(newRestoreSettings);
    setValidation(newValidation);
  };

  const updateCurrentStep = (step: number) => {
    if (maxCompletedStep < step - 1) {
      return;
    }
    setCurrentStep(step);
    setMaxCompletedStep(step - 1);
    clearSaveError();
  };

  const onBack = () => {
    const previousStep = currentStep - 1;
    setCurrentStep(previousStep);
    setMaxCompletedStep(previousStep - 1);
    clearSaveError();
  };

  const onNext = () => {
    if (!validation.isValid) {
      return;
    }
    const nextStep = currentStep + 1;
    setMaxCompletedStep(Math.max(currentStep, maxCompletedStep));
    setCurrentStep(nextStep);
  };

  const executeRestore = () => {
    if (validation.isValid) {
      onSave(restoreSettings);
    }
  };

  return (
    <Fragment>
      <RestoreSnapshotNavigation
        currentStep={currentStep}
        maxCompletedStep={maxCompletedStep}
        updateCurrentStep={updateCurrentStep}
      />
      <EuiSpacer size="l" />
      <EuiForm data-test-subj="restoreSnapshotsForm">
        <CurrentStepForm
          snapshotDetails={snapshotDetails}
          restoreSettings={restoreSettings}
          updateRestoreSettings={updateRestoreSettings}
          errors={validation.errors}
          updateCurrentStep={updateCurrentStep}
        />

        <EuiSpacer size="xl" />

        {saveError ? (
          <Fragment>
            {saveError}
            <EuiSpacer size="m" />
          </Fragment>
        ) : null}

        <EuiFlexGroup>
          {currentStep > 1 ? (
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty
                iconType="arrowLeft"
                onClick={() => onBack()}
                disabled={!validation.isValid}
                data-test-subj="backButton"
              >
                <FormattedMessage
                  id="xpack.snapshotRestore.restoreForm.backButtonLabel"
                  defaultMessage="Back"
                />
              </EuiButtonEmpty>
            </EuiFlexItem>
          ) : null}
          {currentStep < 3 ? (
            <EuiFlexItem grow={false}>
              <EuiButton
                fill
                iconType="arrowRight"
                onClick={() => onNext()}
                disabled={!validation.isValid}
                data-test-subj="nextButton"
              >
                <FormattedMessage
                  id="xpack.snapshotRestore.restoreForm.nextButtonLabel"
                  defaultMessage="Next"
                />
              </EuiButton>
            </EuiFlexItem>
          ) : null}
          {currentStep === 3 ? (
            <EuiFlexItem grow={false}>
              <EuiButton
                fill
                color="success"
                iconType="check"
                onClick={() => executeRestore()}
                isLoading={isSaving}
                data-test-subj="restoreButton"
              >
                {isSaving ? (
                  <FormattedMessage
                    id="xpack.snapshotRestore.restoreForm.savingButtonLabel"
                    defaultMessage="Restoring…"
                  />
                ) : (
                  <FormattedMessage
                    id="xpack.snapshotRestore.restoreForm.submitButtonLabel"
                    defaultMessage="Restore snapshot"
                  />
                )}
              </EuiButton>
            </EuiFlexItem>
          ) : null}
        </EuiFlexGroup>
      </EuiForm>
      <EuiSpacer size="m" />
    </Fragment>
  );
};
