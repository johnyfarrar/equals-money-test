import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import useAxios from './useAxios';

jest.mock('axios');

describe('useAxios', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return the expected state and function', () => {
    const axiosParams = { method: 'get', url: '/some-url' };
    const { result } = renderHook(() => useAxios(axiosParams));

    expect(result.current.response).toBeUndefined();
    expect(result.current.error).toBeUndefined();
    expect(result.current.loading).toBe(true);
    expect(result.current.sendData).toBeInstanceOf(Function);
  });

  it('should set loading to false and set response when data is fetched successfully', async () => {
    const axiosParams = { method: 'get', url: '/some-url' };
    const axiosResponse = { data: 'some-data' };
    (axios.request as jest.Mock).mockResolvedValue(axiosResponse);

    const { result, waitForNextUpdate } = renderHook(() =>
      useAxios(axiosParams)
    );

    await waitForNextUpdate();

    expect(result.current.response).toEqual(axiosResponse);
    expect(result.current.error).toBeUndefined();
    expect(result.current.loading).toBe(false);
  });

  it('should set loading to false and set error when data fetch fails', async () => {
    const axiosParams = { method: 'get', url: '/some-url' };
    const axiosError = new Error('Network Error');
    (axios.request as jest.Mock).mockRejectedValue(axiosError);

    const { result, waitForNextUpdate } = renderHook(() =>
      useAxios(axiosParams)
    );

    await waitForNextUpdate();

    expect(result.current.response).toBeUndefined();
    expect(result.current.error).toEqual(axiosError);
    expect(result.current.loading).toBe(false);
  });

  it('should call fetchData with correct params when sendData is called', async () => {
    const axiosParams = { method: 'post', url: '/some-url', data: 'some-data' };
    const axiosResponse = { data: 'some-data' };
    (axios.request as jest.Mock).mockResolvedValue(axiosResponse);

    const { result } = renderHook(() => useAxios(axiosParams));
    const sendData = result.current.sendData;

    act(() => {
      sendData();
    });

    expect(axios.request).toHaveBeenCalledWith(axiosParams);
  });
});
