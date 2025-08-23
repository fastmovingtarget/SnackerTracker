//2025-08-23 : Editable text changed to be a glorified text input
//2025-08-19 : Wrapper and styles for Editable Text Component

import { render, userEvent } from '@testing-library/react-native';
import EditableText from './EditableText';

describe('EditableText Component', () => {
    describe('Renders', () => {
        it('with initial text', () => {
            const { getByText, queryByPlaceholderText } = render(<EditableText text="Initial Text" onChangeText={jest.fn()} onFinishEditing={jest.fn()} />);
            expect(getByText('Initial Text')).toBeTruthy();
            expect(queryByPlaceholderText('Edit Text')).toBeFalsy();
        });

        it('input when editing an empty string', () => {
            const { queryByText, getByPlaceholderText } = render(<EditableText text="" onChangeText={jest.fn()} onFinishEditing={jest.fn()} />);
            expect(getByPlaceholderText('Edit Text')).toBeTruthy();
            expect(queryByText('Initial Text')).toBeFalsy();
        });
    });
    describe('When Text Changed: ', () => {
        it('calls onChangeText handler', async () => {
            const user = userEvent.setup();
            const onChangeTextMock = jest.fn();
            const { getByPlaceholderText } = render(<EditableText text="" onChangeText={onChangeTextMock} onFinishEditing={jest.fn()} />);

            await user.type(getByPlaceholderText('Edit Text'), 'New Text');

            expect(onChangeTextMock).toHaveBeenCalledWith('New Text');
        });
    });
})