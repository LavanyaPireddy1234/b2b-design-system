import { Component, Prop, h, Host } from '@stencil/core';
import { WizardStatus, WizardSteps } from '../../utils/types/wizard.types';

@Component({
  tag: 'b2b-wizard-icon',
  styleUrl: 'wizard-icon.scss',
  shadow: true,
})
export class WizardIconComponent {
  /** The step number */
  @Prop() step: WizardSteps;

  /** The state of the step */
  @Prop() state: WizardStatus = WizardStatus.PENDING;

  /** Defaults to true. It will show a checkmark icon when a step is completed.
   * Set as false to show the step number */
  @Prop() checkIcon: boolean = true;

  render() {
    return (
      <Host>
        <div
          class={{
            'b2b-wizard-icon': true,
          }}>
          {this.state === WizardStatus.COMPLETED && (
            <b2b-rounded-icon
              color="var(--b2b-color-success-50)"
              content-color="var(--b2b-color-success-100)">
              {this.checkIcon ? (
                <b2b-icon-100 slot="icon" icon="b2b_icon-check"></b2b-icon-100>
              ) : (
                <span slot="text">{this.step}</span>
              )}
            </b2b-rounded-icon>
          )}
          {this.state === WizardStatus.PENDING && (
            <b2b-rounded-icon
              color="var(--b2b-color-icon-default)"
              content-color="var(--b2b-color-icon-inverted)">
              <span slot="text">{this.step}</span>
            </b2b-rounded-icon>
          )}
          {this.state === WizardStatus.DISABLED && (
            <b2b-rounded-icon
              color="var(--b2b-color-grey-100)"
              content-color="var(--b2b-color-grey-400)">
              <span slot="text">{this.step}</span>
            </b2b-rounded-icon>
          )}
          {this.state === WizardStatus.DEFAULT && (
            <b2b-rounded-icon
              color="transparent"
              border-color="var(--b2b-color-icon-secondary)"
              content-color="var(--b2b-color-icon-secondary)">
              <span slot="text">{this.step}</span>
            </b2b-rounded-icon>
          )}
        </div>
      </Host>
    );
  }
}
