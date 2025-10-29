import { render } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { Button } from "./index";

const user = userEvent.setup();
test("button click", async () => {
	const { getByRole } = render(() => <Button>Click me</Button>);
	const button = getByRole("button");
	await user.click(button);
	expect(button).toHaveTextContent("Clicked");
});
