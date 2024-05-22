import { shallowMount } from '@vue/test-utils';
import RegisterView from '@/views/RegisterView.vue';
import axios from 'axios';
import flushPromises from 'flush-promises';
import sinon from 'sinon';

describe('RegisterView.vue', () => {
  it('renders a registration form', () => {
    const wrapper = shallowMount(RegisterView);
    expect(wrapper.find('h1').text()).to.equal('Inscription');
  });

  it('submits the form successfully', async () => {
    const wrapper = shallowMount(RegisterView);
    wrapper.setData({
      form: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'Password123!',
        password2: 'Password123!'
      }
    });

    axios.post = sinon.stub().resolves({ data: { message: 'success' } });

    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    expect(axios.post).to.have.been.calledWith('/api/register', {
      name: 'Test User',
      email: 'test@example.com',
      password: 'Password123!',
      password2: 'Password123!'
    });
  });

  it('shows an error when registration fails', async () => {
    const wrapper = shallowMount(RegisterView);
    wrapper.setData({
      form: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'Password123!',
        password2: 'Password123!'
      }
    });

    const errorMessage = 'Registration failed';
    axios.post = sinon.stub().rejects({
      response: { data: { detail: errorMessage } }
    });

    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    expect(wrapper.vm.errorMessage).to.equal(errorMessage);
  });
});
