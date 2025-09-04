//2025-09-02 : Added collapsible to description, moved blank name handling to container
//2025-08-27 : Minor visual formatting changes
//2025-08-26 : Added symptom description field back in
//2025-08-23 : Symptom form now contains only text input
//2025-06-05 : Symptom form now actually has some text input, tested
//2025-06-04 : Initial Commit with placeholder implementation
import { render, userEvent } from '@testing-library/react-native';
import SymptomForm from './SymptomForm';

const testSymptom = { Symptom_Name: "Headache", Symptom_Description: "Mild headache in the evening" };

describe('SymptomForm', () => {
  it("renders symptom name text", async () => {
    const user = userEvent.setup();
    const { getByLabelText } = render(<SymptomForm submitHandler={jest.fn()} symptom={testSymptom} index={0} />);

    expect(getByLabelText(/Symptom Name 1 Text/i)).toBeTruthy();
    expect(getByLabelText(/Symptom Name 1 Text/i)).toHaveTextContent("Headache");
  });

  it("does not render symptom description text when collapsed", () => {
    const { queryByLabelText } = render(<SymptomForm submitHandler={jest.fn()} symptom={testSymptom} index={0} />);

    expect(queryByLabelText(/Symptom Description 1 Text/i)).toBeNull();
  })
});

describe('Collapsible Sections', () => {
  it("expands symptom description when symptom name is pressed", async () => {
    const user = userEvent.setup();
    const { getByLabelText } = render(<SymptomForm submitHandler={jest.fn()} symptom={testSymptom} index={0} />);

    await user.press(getByLabelText(/Symptom Name 1 Text/i));

    expect(getByLabelText(/Symptom Description 1 Text/i)).toBeTruthy();
  });

  it("collapses symptom description when symptom name is pressed", async () => {
    const user = userEvent.setup();
    const { getByLabelText, queryByLabelText } = render(<SymptomForm submitHandler={jest.fn()} symptom={testSymptom} index={0} />);

    await user.press(getByLabelText(/Symptom Name 1 Text/i));

    expect(getByLabelText(/Symptom Description 1 Text/i)).toBeTruthy();

    await user.press(getByLabelText(/Symptom Name 1 Text/i));

    expect(queryByLabelText(/Symptom Description 1 Text/i)).toBeNull();
  });

  it("renders new description input when expanded and symptom description is empty", async () => {
    const user = userEvent.setup();
    const { getByLabelText } = render(<SymptomForm submitHandler={jest.fn()} symptom={{ Symptom_Name: "Headache", Symptom_Description: "" }} index={0} />);

    await user.press(getByLabelText(/Symptom Name 1 Text/i));

    expect(getByLabelText(/Symptom Description 1 Input/i)).toBeTruthy();
  });
  it("Submits new description input when expanded and symptom description is empty", async () => {
    const user = userEvent.setup();
    const submitHandler = jest.fn();
    const { getByLabelText } = render(<SymptomForm submitHandler={submitHandler} symptom={{ Symptom_Name: "Headache", Symptom_Description: "" }} index={0} />);

    await user.press(getByLabelText(/Symptom Name 1 Text/i));
    await user.type(getByLabelText(/Symptom Description 1 Input/i), "New description");

    expect(submitHandler).toHaveBeenCalledWith({ Symptom_Name: "Headache", Symptom_Description: "New description" }, 0);
  });
});

describe('Editable Text', () => {
  describe('name field', () => {
    it('transitions from text to input', async () => {
      const user = userEvent.setup();
      const { getByLabelText } = render(<SymptomForm submitHandler={jest.fn()} symptom={testSymptom} index={0} />);

      await user.longPress(getByLabelText(/Symptom Name 1 Text/i));
      expect(getByLabelText(/Symptom Name 1 Input/i)).toBeTruthy();
    });
    it('displays correct initial value when editing', async () => {
      const user = userEvent.setup();
      const { getByLabelText } = render(<SymptomForm submitHandler={jest.fn()} symptom={testSymptom} index={0} />);

      await user.longPress(getByLabelText(/Symptom Name 1 Text/i));

      expect(getByLabelText(/Symptom Name 1 Input/i)).toHaveDisplayValue("Headache");
    });
    it('Finishes editing correctly', async () => {
      const user = userEvent.setup();
      const submitHandler = jest.fn();
      const { getByLabelText } = render(<SymptomForm submitHandler={submitHandler} symptom={testSymptom} index={0} />);

      await user.longPress(getByLabelText(/Symptom Name 1 Text/i));

      await user.type(getByLabelText(/Symptom Name 1 Input/i), ' and Vomiting');

      expect(submitHandler).toHaveBeenCalledWith({ Symptom_Name: "Headache and Vomiting", Symptom_Description: "Mild headache in the evening" }, 0);
    });
  })
  describe('description field', () => {
    it('transitions from text to input', async () => {
      const user = userEvent.setup();
      const { getByLabelText } = render(<SymptomForm submitHandler={jest.fn()} symptom={testSymptom} index={0} />);

      await user.press(getByLabelText(/Symptom Name 1 Text/i));
      await user.press(getByLabelText(/Symptom Description 1 Text/i));
      expect(getByLabelText(/Symptom Description 1 Input/i)).toBeTruthy();
    });
    it('displays correct initial value', async () => {
      const user = userEvent.setup();
      const { getByLabelText } = render(<SymptomForm submitHandler={jest.fn()} symptom={testSymptom} index={0} />);

      await user.press(getByLabelText(/Symptom Name 1 Text/i));
      await user.press(getByLabelText(/Symptom Description 1 Text/i));

      expect(getByLabelText(/Symptom Description 1 Input/i)).toHaveDisplayValue("Mild headache in the evening");
    });
    it('finishes editing correctly', async () => {
      const user = userEvent.setup();
      const submitHandler = jest.fn();
      const { getByLabelText } = render(<SymptomForm submitHandler={submitHandler} symptom={testSymptom} index={0} />);

      await user.press(getByLabelText(/Symptom Name 1 Text/i));
      await user.press(getByLabelText(/Symptom Description 1 Text/i));
      await user.type(getByLabelText(/Symptom Description 1 Input/i), ' and Nausea');

      expect(submitHandler).toHaveBeenCalledWith({ Symptom_Name: "Headache", Symptom_Description: "Mild headache in the evening and Nausea" }, 0);
    });
  });
});