import {describe, expect, test} from 'vitest'
import {render, screen} from '@testing-library/react'
import App from "./App.tsx";
import {userEvent} from "@testing-library/user-event";

test('Inputs don`t have any value on page loading', () => {
    render(<App/>);
    const emailInput = screen.getByRole('textbox') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    const confirmPasswordInput = screen.getByLabelText(/Confirm password/i) as HTMLInputElement;
    expect(emailInput.value).toBe("")
    expect(passwordInput.value).toBe("")
    expect(confirmPasswordInput.value).toBe("")
})

describe("User events unit tests", () => {
    test('User can type email in form input', async () => {
        const user = userEvent.setup();
        render(<App/>)

        const emailInput = screen.getByRole('textbox', {
            name: /email/i,
        }) as HTMLInputElement;

        await user.type(emailInput, "test@gmail.com");
        expect(emailInput.value).toBe("test@gmail.com")
    })
    test('User can type password in form input', async () => {
        const user = userEvent.setup();
        render(<App/>)

        const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;

        await user.type(passwordInput, "123");
        expect(passwordInput.value).toBe("123");
    })
    test('User can type confirm password in form input', async () => {
        const user = userEvent.setup();
        render(<App/>)

        const passwordInput = screen.getByLabelText(/Confirm password/i) as HTMLInputElement;

        await user.type(passwordInput, "123");
        expect(passwordInput.value).toBe("123");
    })
})
