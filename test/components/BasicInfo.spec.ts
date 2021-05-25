import { render, fireEvent } from '@testing-library/vue';
import BasicInfo from '@/components/Submit/BasicInfo.vue';

describe('BasicInfo', () => {
  test('emits on data change', async () => {
    const { getByText, getByTestId, emitted } = render(BasicInfo);

    getByText('Project Information');

    const nameInput = getByTestId('name');
    const websiteInput = getByTestId('website');
    const typeInput = getByTestId('type');
    const categoryInput = getByTestId('category');
    const shortDescriptionInput = getByTestId('shortDescription');
    const longDescriptionInput = getByTestId('longDescription');

    await fireEvent.update(nameInput, 'symbol.directory');
    await fireEvent.update(websiteInput, 'https://symbol.directory');
    await fireEvent.update(typeInput, 'DAPP');
    await fireEvent.update(categoryInput, 'marketplace');
    await fireEvent.update(shortDescriptionInput, 'List all Symbol Projects');
    await fireEvent.update(
      longDescriptionInput,
      'A project to find any project related to Symbol Blockchain'
    );

    expect(emitted().basicInfo).toBeTruthy();
    expect(emitted().basicInfo[0][0]).toStrictEqual({
      name: 'symbol.directory',
      website: 'https://symbol.directory',
      type: 'DAPP',
      category: 'marketplace',
      shortDescription: 'List all Symbol Projects',
      longDescription:
        'A project to find any project related to Symbol Blockchain'
    });
  });
});
