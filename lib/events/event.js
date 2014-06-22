

/**
 * @constructor
 * @param {string} type
 * @param {!events.IEventEmitter} target
 * @param {number=} opt_isBubbling
 */
events.Event = function(type, target, opt_isBubbling) {
  /**
   * @type {string}
   */
  this.__type = type;

  /**
   * @type {!events.IEventEmitter}
   */
  this.__target = target;

  /**
   * @type {number}
   */
  this.__flags = opt_isBubbling || 0;
};


/**
 * @type {number}
 */
events.Event.BUBBLING = 1;


/**
 * @type {number}
 */
events.Event.STOPPED = 2;


/**
 * @type {number}
 */
events.Event.IMMEDIATE_STOPPED = 4;


/**
 * @type {number}
 */
events.Event.PREVENT_DEFAULT = 8;


/**
 * @return {string}
 */
events.Event.prototype.getType = function() {
  return this.__type;
};


/**
 * @return {!events.IEventEmitter}
 */
events.Event.prototype.getTarget = function() {
  return this.__target;
};


/**
 * @return {number}
 */
events.Event.prototype.isBubbling = function() {
  return this.__flags | events.Event.BUBBLING === this.__flags;
};


/**
 * @return {number}
 */
events.Event.prototype.isStopped = function() {
  return this.__flags | events.Event.STOPPED === this.__flags;
};


/**
 * @return {number}
 */
events.Event.prototype.isImmediateStopped = function() {
  return this.__flags | events.Event.IMMEDIATE_STOPPED === this.__flags;
};


/**
 * @return {number}
 */
events.Event.prototype.isPreventDefault = function() {
  return this.__flags | events.Event.PREVENT_DEFAULT === this.__flags;
};


/**
 * @return {number}
 */
events.Event.prototype.isBubblingEnabled = function() {
  return this.__flags | events.Event.BUBBLING & events.Event.STOPPED ===
      this.__flags;
};


/**
 *
 */
events.Event.prototype.stopPropagation = function() {
  this.__flags &= ~events.Event.STOPPED;
};


/**
 *
 */
events.Event.prototype.stopImmediatePropagation = function() {
  this.__flags &= ~events.Event.IMMEDIATE_STOPPED;
};


/**
 *
 */
events.Event.prototype.preventDefault = function() {
  this.__flags &= ~events.Event.PREVENT_DEFAULT;
};
