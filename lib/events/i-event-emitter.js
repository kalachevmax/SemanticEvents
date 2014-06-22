

/**
 * @interface
 */
events.IEventEmitter = function() {};


/**
 * @param {events.Event|string} event
 */
events.IEventEmitter.prototype.emit = function(event) {};


/**
 * @param {string} type
 * @param {!Function} listener
 */
events.IEventEmitter.prototype.addEventListener =
    function(type, listener) {};


/**
 * @param {string} type
 * @param {!Function} listener
 */
events.IEventEmitter.prototype.removeEventListener =
    function(type, listener) {};


/**
 * @param {string} type
 */
events.IEventEmitter.prototype.removeAllEventListeners = function(type) {};


/**
 * @param {string} type
 * @param {!Function} listener
 */
events.IEventEmitter.prototype.hasEventListener =
    function(type, listener) {};
