//2025-08-19 : Wrapper and styles for Editable Text Component

import { render, userEvent } from '@testing-library/react-native';
import EditableText from './EditableText';

describe('EditableText Component', () => {
    describe('Renders', () => {
        it('with initial text', () => {
            const { getByText, queryByPlaceholderText } = render(<EditableText text="Initial Text" />);
            expect(getByText('Initial Text')).toBeTruthy();
            expect(queryByPlaceholderText('Edit Text')).toBeFalsy();
        });

        it('input when editing an empty string', () => {
            const { queryByText, getByPlaceholderText } = render(<EditableText text="" />);
            expect(getByPlaceholderText('Edit Text')).toBeTruthy();
            expect(queryByText('Initial Text')).toBeFalsy();
        });

        it("edit button is present when not editing", () => {
            const { getByText } = render(<EditableText text="Initial Text" />);
            expect(getByText('Edit')).toBeTruthy();
        });

        it("delete button is present when not editing", () => {
            const { getByText } = render(<EditableText text="Initial Text" />);
            expect(getByText('Delete')).toBeTruthy();
        });

        it("done button is present when editing", () => {
            const { getByText } = render(<EditableText text="" />);
            expect(getByText('Done')).toBeTruthy();
        });
    });
    describe('When Button Pressed: ', () => {
        it('Edit: toggles to editing mode', async () => {
            const user = userEvent.setup();
            const { queryByText, queryByPlaceholderText } = render(<EditableText text="Initial Text" />);

            await user.press(queryByText('Edit'));

            expect(queryByPlaceholderText('Edit Text')).toBeTruthy();
            expect(queryByText('Initial Text')).toBeFalsy();
        });
        it('Delete: calls delete handler', async () => {
            const user = userEvent.setup();
            const deleteHandlerMock = jest.fn();
            const { getByLabelText } = render(<EditableText text="Initial Text" onDelete={deleteHandlerMock} />);

            await user.press(getByLabelText(/Delete/i));

            expect(deleteHandlerMock).toHaveBeenCalled();
        });
        it('Done: toggles out of editing mode, calls onFinishEditing', async () => {
            const user = userEvent.setup();
            const onFinishEditingMock = jest.fn();
            const { getByText, queryByPlaceholderText } = render(<EditableText text="Initial Text" onFinishEditing={onFinishEditingMock} />);

            await user.press(getByText('Edit'));
            await user.press(getByText('Done'));

            expect(queryByPlaceholderText('Edit Text')).toBeFalsy();
            expect(getByText('Initial Text')).toBeTruthy();
            expect(onFinishEditingMock).toHaveBeenCalled();
        });
    })
    describe('When Text Changed: ', () => {
        it('calls onChangeText handler', async () => {
            const user = userEvent.setup();
            const onChangeTextMock = jest.fn();
            const { getByPlaceholderText } = render(<EditableText text="" onChangeText={onChangeTextMock} />);

            await user.type(getByPlaceholderText('Edit Text'), 'New Text');

            expect(onChangeTextMock).toHaveBeenCalledWith('New Text');
        });
    });
})