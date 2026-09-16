# Key Decisions

## Using opacity and psuedo elements instead of animating colour change

Opacity is compositor only and skip the layout and paint step in the browsers renderer, it's smoother more scalable, especially noticable on lower end devices.

## Using the --travel CSS function and translate instead of absolute

Same story with Opacity, with the addition that the --travel function calculates how much distance it can move, so if width, height, or padding of the container changes, the translate css property will not break.

## using fireEvent on some vitest tests instead of userEvent

Combining useFakeTimers with userEvent causes timeouts, using vitest to test the 2000ms accurately is still good to have so testing this in vitest still with fireEvent is worthwhile, userEvent would simulate the actual user interaction better than fireEvent though and would be preferable.

## Duplicated tests in playwright

The auto revert at 2000ms, and clicking off before 2000ms cancels the pending revert are duplicated tests for this reason, playwright will simulate a real browser better, filling that small gap created by using fireEvent in vitest.
