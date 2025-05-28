// __mocks__/@phosphor-icons/react.js

const MockIcon = (props) => {
  return <div data-testid="mock-icon" {...props}>Icon</div>;
};

export const IconName = MockIcon; // Example export
export default {
  IconName: MockIcon, // Replace `IconName` with any icon name used in your app
};
