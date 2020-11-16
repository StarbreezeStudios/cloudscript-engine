'use strict';

const eachItem = (chai, utils) => {
  const Assertion = chai.Assertion;

  function assertInstanceOf(self, item, index, expectedClass) {
    self.assert(
      item instanceof expectedClass
      , `expected ${item} (${item.constructor.name}) to be instance of #{exp}`
      , `expected ${item} (${item.constructor.name}) not to be instance of #{exp}`
      , expectedClass.name
      , item
      , true
    );
  }


  function assertSatisfies(self, item, index, method) {
    self.assert(
      method(item, index)
      , `expected ${item} to satisfy expression #{exp}`
      , `expected ${item} not satisfy expression #{exp}`
      , method
      , item
      , true
    );
  }

  function setTransformMethod(transformMethod = it => it) {
    utils.flag(this, 'transformMethod', transformMethod);
  }

  function useIdentityMethod() {
    utils.flag(this, 'transformMethod', null);
  }

  function originalWrapper(fn) {
    return _super => {
      return function (args) {
        const transformMethod = utils.flag(this, 'transformMethod');
        if (!transformMethod) {
          return _super.apply(this, arguments);
        }
        this._obj.forEach((item, index) => {
          item = transformMethod(item, index);
          fn(this, item, index, args);
        });
      };
    };
  }

  Assertion.addChainableMethod('eachItem', setTransformMethod, useIdentityMethod);
  Assertion.overwriteMethod('instanceOf', originalWrapper(assertInstanceOf));
  Assertion.overwriteMethod('satisfy', originalWrapper(assertSatisfies));
};


module.exports = {
  eachItem
};
