export default (RestangularProvider) => {
  'ngInject';

  RestangularProvider.setBaseUrl('/api');

  RestangularProvider.addResponseInterceptor(responseInterceptor);

  /**
   *
   * @param data The data received got from the server
   * @param operation The operation made. It'll be the HTTP method used except for a GET which returns a list of element which will return getList so that you can distinguish them.
   * @param what The model that's being requested. It can be for example: accounts, buildings, etc.
   * @param url The relative URL being requested. For example: /api/v1/accounts/123
   * @param response Full server response including headers
   * @param deferred The deferred promise for the request.
   */
  function responseInterceptor(data, operation, what, url, response, deferred){
    if(data.status !== 200) {
      deferred.reject({
        error: data.msg,
        status: data.status
      });
      return operation === 'getList' ? [] : void 0;
    }

    return data.data;
  }

}
