import { SpectatorHost, createHostFactory } from '@ngneat/spectator/jest';
import { UiDropdownSelectComponent } from './ui-dropdown-select.component';

describe('UiDropdownSelectComponent', () => {
  let spectator: SpectatorHost<UiDropdownSelectComponent>;

  const createComponent = createHostFactory({
    component: UiDropdownSelectComponent,
    template: `
      <button data-test="outside">outside the component</button>
      <kc-ui-dropdown-select></kc-ui-dropdown-select>
    `,
  });

  beforeEach(() => {
    spectator = createComponent();
    spectator.setInput({
      options: ['Option 1', 'Option 2'],
    });
  });

  it('should display the options', () => {
    const options = spectator.queryAll('.dropdown-option');
    expect(options.length).toEqual(2);
    expect(options[0].textContent).toEqual('Option 1');
    expect(options[1].textContent).toEqual('Option 2');
  });

  it('should open the dropdown panel', () => {
    spectator.click('.dropdown-button');
    expect(spectator.component.opened).toEqual(true);
  });

  it('should close the dropdown panel when clicking on the dropdown button', () => {
    spectator.setInput({
      opened: true,
    });
    spectator.click('.dropdown-button');
    expect(spectator.component.opened).toEqual(false);
  });

  it('should close the dropdown panel when clicking on an option', () => {
    spectator.setInput({
      opened: true,
    });
    spectator.click('.dropdown-option');
    expect(spectator.component.opened).toEqual(false);
  });

  it('should close the dropdown panel when clicking outside ', () => {
    spectator.setInput({
      opened: true,
    });

    spectator.queryHost('[data-test=outside]')?.dispatchEvent(
      new MouseEvent('mousedown', {
        clientX: 0,
        clientY: 0,
        bubbles: true,
        button: 0,
      })
    );

    expect(spectator.component.opened).toEqual(false);
  });

  it('should select the option', () => {
    spectator.setInput({
      opened: true,
    });

    jest.spyOn(spectator.component.optionSelected, 'emit');

    spectator.click('.dropdown-option');

    expect(spectator.component.selectedOption).toEqual('Option 1');
    expect(spectator.component.optionSelected.emit).toHaveBeenCalledTimes(1);
    expect(spectator.component.optionSelected.emit).toHaveBeenCalledWith(
      'Option 1'
    );
    expect(spectator.component.opened).toEqual(false);
  });
});
