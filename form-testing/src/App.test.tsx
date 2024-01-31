import '@testing-library/jest-dom'
import {describe, expect, test} from 'vitest'
import {fireEvent, render, screen} from '@testing-library/react'
import App from "./App.tsx";
import {userEvent} from "@testing-library/user-event";
import {ValidationErrors} from "./enums.ts";

describe("Check form state on page loading", () => {
    test('Inputs don`t have any value on page loading', () => {
        render(<App/>);

        const emailInput = screen.getByPlaceholderText('email') as HTMLInputElement;
        const passwordInput = screen.getByPlaceholderText('password') as HTMLInputElement;
        const confirmPasswordInput = screen.getByPlaceholderText('confirm password') as HTMLInputElement;
        const privacyPolicyCheckbox = screen.getByLabelText('I agree to the privacy policy') as HTMLInputElement;

        expect(emailInput.value).toBe("")

        expect(passwordInput.value).toBe("")

        expect(confirmPasswordInput.value).toBe("")

        expect(privacyPolicyCheckbox).not.toBeChecked()
    })
})

describe("User events unit tests", () => {
    test('User can type email in form input', async () => {
        const user = userEvent.setup()

        render(<App/>);

        const emailInput = screen.getByPlaceholderText('email') as HTMLInputElement;

        await user.type(emailInput, "test@gmail.com")

        expect(emailInput.value).toBe("test@gmail.com")
    })
    test('User can type password in form input', async () => {
        const user = userEvent.setup()

        render(<App/>);

        const passwordInput = screen.getByPlaceholderText('password') as HTMLInputElement;

        await user.type(passwordInput, "123")

        expect(passwordInput.value).toBe("123")
    })
    test('User can type confirm password in form input', async () => {
        const user = userEvent.setup()

        render(<App/>);

        const confirmPasswordInput = screen.getByPlaceholderText('confirm password') as HTMLInputElement;

        await user.type(confirmPasswordInput, "123")

        expect(confirmPasswordInput.value).toBe("123")
    })
    test('User can select checkbox', async () => {
        render(<App/>);

        const privacyPolicyCheckbox = screen.getByLabelText('I agree to the privacy policy') as HTMLInputElement;

        expect(privacyPolicyCheckbox).not.toBeChecked()

        fireEvent.click(privacyPolicyCheckbox)

        expect(privacyPolicyCheckbox).toBeChecked()
    })
})

describe("Validation errors unit tests", () => {
    test('Show invalid email error message', async () => {
        const user = userEvent.setup()

        render(<App/>);

        const emailInput = screen.getByPlaceholderText('email') as HTMLInputElement;
        const formSubmitButton = screen.getByRole("button", {name: /Create account/i})
        let emailErrorElement = screen.queryByText(ValidationErrors.invalidEmail)

        expect(emailErrorElement).not.toBeInTheDocument()

        await user.type(emailInput, "bademail.com")

        await userEvent.click(formSubmitButton)

        emailErrorElement = screen.queryByText(ValidationErrors.invalidEmail)

        expect(emailErrorElement).toBeInTheDocument()
    })
    test('Show empty email error message', async () => {
        render(<App/>);

        const formSubmitButton = screen.getByRole("button", {name: /Create account/i})

        let requiredEmailErrorElem = screen.queryByText(ValidationErrors.requiredEmail)

        expect(requiredEmailErrorElem).not.toBeInTheDocument()

        await userEvent.click(formSubmitButton)

        requiredEmailErrorElem = screen.queryByText(ValidationErrors.requiredEmail)

        expect(requiredEmailErrorElem).toBeInTheDocument()
    })
    test('Show empty password error message', async () => {
        render(<App/>);

        const formSubmitButton = screen.getByRole("button", {name: /Create account/i})

        let requiredPasswordErrorElem = screen.queryByText(ValidationErrors.requiredPassword)

        expect(requiredPasswordErrorElem).not.toBeInTheDocument()

        await userEvent.click(formSubmitButton)

        requiredPasswordErrorElem = screen.queryByText(ValidationErrors.requiredPassword)

        expect(requiredPasswordErrorElem).toBeInTheDocument()
    })
    test('Show validation error in case of too short password', async () => {
        const user = userEvent.setup()

        render(<App/>);

        const passwordInput = screen.getByPlaceholderText('password') as HTMLInputElement;
        const formSubmitButton = screen.getByRole("button", {name: /Create account/i})

        let passwordErrorElement = screen.queryByText(ValidationErrors.shortPassword)

        expect(passwordErrorElement).not.toBeInTheDocument()

        await user.type(passwordInput, "ss")

        await userEvent.click(formSubmitButton)

        passwordErrorElement = screen.queryByText(ValidationErrors.shortPassword)

        expect(passwordErrorElement).toBeInTheDocument();
    })
    test('Show empty confirm email error message', async () => {

        render(<App/>);

        const formSubmitButton = screen.getByRole("button", {name: /Create account/i})

        let requiredConfirmPasswordErrorElem = screen.queryByText(ValidationErrors.requiredConfirmPassword)

        expect(requiredConfirmPasswordErrorElem).not.toBeInTheDocument()

        await userEvent.click(formSubmitButton)

        requiredConfirmPasswordErrorElem = screen.queryByText(ValidationErrors.requiredConfirmPassword)

        expect(requiredConfirmPasswordErrorElem).toBeInTheDocument()
    })
    test('Show validation error in case of too short confirm password', async () => {
        const user = userEvent.setup()

        render(<App/>);

        const confirmPasswordInput = screen.getByPlaceholderText('confirm password') as HTMLInputElement;
        const passwordInput = screen.getByPlaceholderText('password') as HTMLInputElement;
        const formSubmitButton = screen.getByRole("button", {name: /Create account/i})

        let confirmPasswordErrorElem = screen.queryByText(ValidationErrors.shortConfirmPassword)

        expect(confirmPasswordErrorElem).not.toBeInTheDocument()

        await user.type(passwordInput, "ss")
        await user.type(confirmPasswordInput, "ss");

        await userEvent.click(formSubmitButton)

        confirmPasswordErrorElem = screen.queryByText(ValidationErrors.shortConfirmPassword)

        expect(confirmPasswordErrorElem).toBeInTheDocument();
    })
    test('Show validation error if the password and confirm password do not match', async () => {
        const user = userEvent.setup()

        render(<App/>);

        const formSubmitButton = screen.getByRole("button", {name: /Create account/i})
        const passwordInput = screen.getByPlaceholderText('password') as HTMLInputElement;
        const confirmPasswordInput = screen.getByPlaceholderText('confirm password') as HTMLInputElement;

        let confirmPasswordErrorElem = screen.queryByText(ValidationErrors.passwordsMustMatch)

        expect(confirmPasswordErrorElem).not.toBeInTheDocument()

        await user.type(passwordInput, "test123")
        await user.type(confirmPasswordInput, "test1234")

        await userEvent.click(formSubmitButton);

        confirmPasswordErrorElem = screen.queryByText(ValidationErrors.passwordsMustMatch)

        expect(confirmPasswordErrorElem).toBeInTheDocument()
    })
    test('Show unselect privacy policy checkbox validation message', async () => {

        render(<App/>);

        const privacyPolicyCheckbox = screen.getByLabelText('I agree to the privacy policy') as HTMLInputElement;
        const formSubmitButton = screen.getByRole("button", {name: /Create account/i})

        let privacyPolicyErrorElem = screen.queryByText(ValidationErrors.requiredPrivacyPolicy)

        expect(privacyPolicyCheckbox).not.toBeChecked()

        expect(privacyPolicyErrorElem).not.toBeInTheDocument()

        await userEvent.click(formSubmitButton)

        privacyPolicyErrorElem = screen.queryByText(ValidationErrors.requiredPrivacyPolicy)

        expect(privacyPolicyErrorElem).toBeInTheDocument()
    })
})
