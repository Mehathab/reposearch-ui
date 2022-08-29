import { ChakraProvider } from '@chakra-ui/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SearchModal } from './SearchModal';

export default {
  component: SearchModal,
  title: 'ui-components/SearchModal',
} as ComponentMeta<typeof SearchModal>;

const Template: ComponentStory<typeof SearchModal> = (args) => (
  <ChakraProvider>
    <SearchModal {...args} />
  </ChakraProvider>
);

export const Primary = Template.bind({});
Primary.args = {
  maxW: 'container.sm',
  placeholder: 'Search github repositories',
};
export const withChildren = Template.bind({});
withChildren.args = {
  maxW: 'container.sm',
  placeholder: 'Search github repositories',
  children: <p>Hi There</p>,
};

export const loadingState = Template.bind({});
loadingState.args = {
  maxW: 'container.sm',
  placeholder: 'Search github repositories',
  isPending: true,
};
export const successState = Template.bind({});
successState.args = {
  maxW: 'container.sm',
  placeholder: 'Search github repositories',
  isSuccess: true,
};
export const errorState = Template.bind({});
errorState.args = {
  maxW: 'container.sm',
  placeholder: 'Search github repositories',
  isError: true,
};
