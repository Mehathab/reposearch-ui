import { ComponentStory, ComponentMeta } from '@storybook/react';
import { RepoSearch } from './RepoSearch';

export default {
  component: RepoSearch,
  title: 'RepoSearch',
} as ComponentMeta<typeof RepoSearch>;

const Template: ComponentStory<typeof RepoSearch> = (args) => (
  <RepoSearch {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
