import { newE2EPage } from '@stencil/core/testing';

describe('B2B Input Group', () => {
  let page;
  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
        <b2b-input-group hint="A group hint" error="A group error">
        <b2b-input slot="start" label="Search Term"></b2b-input>
        <b2b-dropdown label="Data Set" invalid error="an error">
          <option value="one">€</option>
          <option value="one">$</option>
        </b2b-dropdown>
        <b2b-input label="Another input" invalid error="an error"></b2b-input>
        <b2b-dropdown>
          <option value="one">€</option>
          <option value="one">$</option>
        </b2b-dropdown>
        <b2b-button slot="end" variant="primary" disabled><b2b-icon-100 icon="b2b_icon-search"></b2b-icon-100></b2b-button>
      </b2b-input-group>`);
  });

  it('should render the input group component', async () => {
    const element = await page.find('b2b-input-group');
    expect(element).not.toBeNull();
  });

  it('should disable the input group component', async () => {
    let element = await page.find('b2b-input-group');
    expect(element).not.toHaveAttribute('disabled');

    element.setAttribute('disabled', true);

    await page.waitForChanges();

    element = await page.find('b2b-input-group');
    expect(element).toHaveAttribute('disabled');
  });

  it('should disable individual elements of the group and keep their state when the group is dis- and enabled', async () => {
    let button = await page.find('b2b-button');
    expect(await button.getProperty('disabled')).toBe(true);

    let group = await page.find('b2b-input-group');

    await group.setProperty('disabled', true);
    await page.waitForChanges();

    expect(await group.getProperty('disabled')).toBe(true);

    await group.setProperty('disabled', false);
    await page.waitForChanges();

    expect(await group.getProperty('disabled')).toBe(false);
    expect(await button.getProperty('disabled')).toBe(true);
  });

  it('should render a group hint if one is specified', async () => {
    const element = await page.find('b2b-input-group >>> span');
    expect(element).toEqualText('A group hint');
  });

  it('should render a group error if one is specified and the group is set to invalid', async () => {
    const element = await page.find('b2b-input-group');
    element.setAttribute('invalid', true);

    await page.waitForChanges();

    const error = await page.find('b2b-input-group >>> span');

    expect(error).toEqualText('A group error');
  });

  it('should not render a group error if the group is disabled', async () => {
    const element = await page.find('b2b-input-group');
    const hint = await page.find('b2b-input-group >>> span');

    element.setAttribute('disabled', true);

    expect(hint).toEqualText('A group hint');
  });

  it('should remove all children texts from individual components', async () => {
    const input = await page.find('b2b-input');

    expect(input.error).not.toBeDefined;
    expect(input.hint).not.toBeDefined;

    const dropdown = await page.find('b2b-dropdown');

    expect(dropdown.error).not.toBeDefined;
    expect(dropdown.hint).not.toBeDefined;
  });

  it('should not prevent individual events from being triggered in the children', async () => {
    const input = await page.find('b2b-input >>> input');
    const inputSpy = await page.spyOnEvent('b2b-input');

    await input.press('KeyA');

    await page.waitForChanges();

    expect(inputSpy).toHaveReceivedEvent();
  });
});
