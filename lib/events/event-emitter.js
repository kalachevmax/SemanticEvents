

/**
 * @constructor
 * @implements {events.IEventEmitter}
 * @param {events.EventEmitter} opt_propagationParent
 */
events.EventEmitter = function(opt_propagationParent) {
  /**
   * @type {!Object.<string, !Array.<!Function>>}
   */
  this.__listeners = {};

  /**
   * @type {events.EventEmitter}
   */
  this.__propagationParent = opt_propagationParent || null;
};


/**
 * @param {!events.Event|string} event
 * @param {*=} opt_data
 */
events.EventEmitter.prototype.emit = function(event, opt_data) {
  if (!(event instanceof events.Event)) {
    event = new events.Event(event, this);
  }

  var listeners = this.__listeners[event.getType()];

  if (listeners instanceof Array) {
    var i = 0,
        l = listeners.length;

    while (i < l) {
      listeners[i].call(this, event, opt_data);

      if (event.isImmediateStopped()) {
        break;
      }

      i += 1;
    }

    if (this.__propagationParent !== null && event.isBubblingEnabled()) {
      this.__propagationParent.emit(event, opt_data);
    }
  }
};


/**
 * @param {string} type
 * @param {!Function} listener
 */
events.EventEmitter.prototype.addEventListener = function(type, listener) {
  if (!(this.__listeners[type] instanceof Array)) {
    this.__listeners[type] = [listener];
  } else if (!this.hasEventListener(type, listener)) {
    this.__listeners[type].push(listener);
  }
};


/**
 * @param {string} type
 * @param {!Function} listener
 */
events.EventEmitter.prototype.removeEventListener = function(type, listener) {
  if (this.__listeners[type] instanceof Array) {
    var index = utils.indexOf(listener, this.__listeners[type]);

    if (index !== -1) {
      this.__listeners[type].splice(index, 1);
    }
  }
};


/**
 * @param {string=} opt_type
 */
events.EventEmitter.prototype.removeAllEventListeners = function(opt_type) {
  if (typeof opt_type === 'undefined') {
    this.__listeners = {};
  } else {
    delete this.__listeners[opt_type];
  }
};


/**
 * @param {string} type
 * @param {!Function} listener
 */
events.EventEmitter.prototype.hasEventListener = function(type, listener) {
  if (this.__listeners[type] instanceof Array) {
    return utils.indexOf(listener, this.__listeners[type]) !== -1;
  }

  return false;
};
