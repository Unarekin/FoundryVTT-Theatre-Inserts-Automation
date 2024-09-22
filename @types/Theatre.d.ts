export { }

declare global {

  declare const theatre: Theatre;

  /**
   * ============================================================
   * Singleton Theatre
   *
   *
   *
   *
   *
   * ============================================================
   */
  export class Theatre {
    /**
     * ============================================================
     *
     * Theatre statics
     *
     * ============================================================
     */
    /**
     * Reorder theatre inserts in the dockContainer to align with where their
     * text-box's position is on the bar such that the insert is always over
     * the corresponding text-box.
     *
     */
    static reorderInserts(): any;
    /**
     * Set wither or not to display or hide theatre debug information.
     *
     * @params state (Boolean) : Boolean indicating if we should toggle debug on/off
     */
    static setDebug(state: any): any;
    /**
     * Verify the TweenMax ease from the animation syntax shorthand.
     *
     * @params str (String) : the ease to verify.
     */
    static verifyEase(str: any): any;
    /**
     * Return an array of tween params if the syntax is correct,
     * else return an empty array if any tweens in the syntax
     * are flag as incorrect.
     *
     * @param str (String) : The syntax to verify
     *
     * @return (Array[Object]) : The array of verified tween params, or null
     */
    static verifyAnimationSyntax(str: any): any;
    /**
     * Prepare fonts and return the list of fonts available
     *
     * @return (Array[(String)]) : The array of font familys to use.
     */
    static getFonts(): any;
    static getActorDisplayName(actorId: any): any;
    /**
     * Get the emotes for the actor by merging
     * whatever is in the emotes flag with the default base
     *
     * @param actorId (String) : The actorId of the actor to get emotes from.
     * @param disableDefault (Boolean) : Wither or not default emotes are disabled.
     *                                   in which case, we don't merge the actor
     *                                   emotes with the default ones.
     *
     * @return (Object) : An Object containg the emotes for the requested actorId.
     */
    static getActorEmotes(actorId: any, disableDefault: any): any;
    /**
     * Get the rigging resources for the actor by merging
     * whater is in the rigging.resources flag with the default base
     *
     * @params actorId (String) : The actorId of the actor to get rigging resources
     *                            from.
     *
     * @return (Array[(Object)]) : An array of {name: (String), path: (String)} tuples
     *                             representing the rigging resource map for the specified actorId.
     */
    static getActorRiggingResources(actorId: any): any;
    /**
     * Default rigging resources
     *
     * @return (Array[(Object)]) : An array of {name: (String), path: (String)} tuples
     *                             representing the default rigging resource map.
     */
    static getDefaultRiggingResources(): any;
    /**
     * Get default emotes, immutable
     *
     * @return (Object) : An Object, whose properties are the default set
     *                     emotes.
     */
    static getDefaultEmotes(): any;
    /**
     * Split to chars, logically group words based on language.
     *
     * @param text (String) : The text to split.
     * @param textBox (HTMLElement) : The textBox the text will be contained in.
     *
     * @return (Array[HTMLElement]) : An array of HTMLElements of the split text.
     */
    static splitTextBoxToChars(text: any, textBox: any): any;
    /**
     *
     * ActorSheet Configue Options
     *
     * @params ev (Event) : The event that triggered the configuration option.
     * @params actorSheet (Object ActorSheet) : The ActorSheet Object to spawn a configure
     *                                          window from.
     */
    static onConfigureInsert(ev: any, actorSheet: any): any;
    /**
     * Add to the nav bar staging area with an actorSheet.
     *
     * @params ev (Event) : The event that triggered adding to the NavBar staging area.
     */
    static onAddToNavBar(ev: any, actorSheet: any, removeLabelSheetHeader: any): any;
    static _getTheatreId(actor: any): any;
    /**
     * Add to the NavBar staging area
     *
     * @params actor (Actor) : The actor from which to add to the NavBar staging area.
     */
    static addToNavBar(actor: any): any;
    /**
     * Removes the actor from the nav bar.
     *
     * @params actor (Actor) : The actor to remove from the NavBar staging area.
     */
    static removeFromNavBar(actor: any): any;
    /**
     * Returns whether the actor is on the stage.
     * @params actor (Actor) : The actor.
     */
    static isActorStaged(actor: any): any;
    static clearStage(): any;
    /**
     * get the text animation given the name
     *
     * @param name (String) : The name of the standing text animation to get.
     *
     * @return (Object) : An Object tuple of {func: (Function), label: (String)}
     *                     representing the animation function and function label.
     *
     */
    static textStandingAnimation(name: any): any;
    /**
     * Get text Flyin Animation funciton, still needs to supply
     * 1. charSpans
     * 2. delay
     * 3. speed
     * 4. standingAnim (optional standin animation)
     *
     * @params name (String) : The name of the fly-in animation to use
     *
     * @return (Object) : An Object tuple of {func: (Function), label: (String)}
     *                     representing the animation function and function label.
     *
     */
    static textFlyinAnimation(name: any): any;
    titleFont: string;
    textFont: string;
    fontWeight: string;
    reorderTOId: any;
    swapTarget: any;
    dragPoint: any;
    dragNavItem: any;
    isNarratorActive: boolean;
    isSuppressed: boolean;
    isQuoteAuto: boolean;
    isDelayEmote: boolean;
    delayedSentState: number;
    rendering: boolean;
    renderAnims: number;
    speakingAs: any;
    stage: {};
    portraitDocks: any[];
    userEmotes: {};
    usersTyping: {};
    userSettings: {};
    pixiCTX: any;
    pixiToolTipCTX: any;
    lastTyping: number;
    resync: {
      type: string;
      timeoutId: any;
    };
    settings: {
      autoDecay: boolean;
      decayRate: number;
      decayMin: number;
      barStyle: string;
      narrHeight: string;
    };
    functions: {
      addToNavBar: (actor: any) => any;
      removeFromNavBar: (actor: any) => any;
      activateStagedByID: (i: any) => void;
      removeFromStagedByID: (i: any) => void;
    };
    initialize(): void;
    /**
     * Inject HTML
     *
     * @private
     */
    private _injectHTML;
    theatreGroup: HTMLDivElement;
    theatreDock: any;
    theatreToolTip: HTMLDivElement;
    theatreBar: HTMLDivElement;
    theatreNarrator: HTMLDivElement;
    theatreControls: HTMLDivElement;
    theatreNavBar: HTMLDivElement;
    theatreChatCover: HTMLDivElement;
    theatreEmoteMenu: HTMLDivElement;
    /**
     * Init Module Settings
     *
     * @private
     */
    private _initModuleSettings;
    /**
     * Configure the theatre display mode
     *
     * @param theatreStyle (String) : The theatre Style to apply
     */
    configTheatreStyle(theatreStyle: any): void;
    /**
     * Socket backup to the module method
     *
     * bind socket receiver for theatre events
     *
     * @private
     */
    private _initSocket;
    /**
       * Send a packet to all clients indicating the event type, and
       * the data relevant to the event. The caller must specify this
       * data.
       *
       * Scene Event Sub Types
       *
       * enterscene : an insert was injected remotely
       * exitscene : an insert was removed remotely
       * positionupdate : an insert was moved removely
       * push : an insert was pushed removely
       * swap : an insert was swapped remotely
       * emote : an emote was triggered removely
       * addtexture : a texture asset was added remotely
       * addalltextures : a group of textures were added remotely
       * state : an insert's assets were staged remotely
       * narrator : the narrator bar was activated remotely
       * decaytext : an insert's text was decayed remotely
       * renderinsert : an insert is requesting to be rendered immeidately remotely
   
       *
       * @param eventType (String) : The scene event subtype
       * @param evenData (Object) : An Object whose properties are needed for
       *                            the scene event subtype
       *
       * @private
       */
    private _sendSceneEvent;
    /**
     * Send a packet to all clients indicating
     *
     * 1. Which insert we're speaking as, or no longer speaking as
     * 2. Wither or not we're typing currently
     * 3. What typing animations we've chosen
     *
     * @private
     */
    private _sendTypingEvent;
    /**
     * Someone is asking for a re-sync event, so we broadcast the entire scene
     * state to this target individual
     *
     * @param targetId (String) : The userId whom is requesting a resync event
     *
     * @private
     */
    private _sendResyncEvent;
    /**
     * Compiles Resync insertdata
     *
     * @return (Array[Object]) : The array of objects that represent an insert's data
     *
     * @private
     */
    private _buildResyncData;
    /**
     * Send a request for for a Resync Event.
     *
     * Resync Request Types
     *
     * any : sender is asking for a resync packet from anyone
     * gm : sender is asking for a resync packet from a GM
     * players : sender is a GM and is telling all players to resync with them
     *
     * @param type (String) : The type of resync event, can either be "players" or "gm"
     *                        indicating wither it's to resync "all players" or to resync with a gm (any GM)
     * @private
     */
    private _sendResyncRequest;
    /**
     * Resync rquests can be either :
     *
     * any : sender is asking for a resync packet from anyone
     * gm : sender is asking for a resync packet from a GM
     * players : sender is a GM and is telling all players to resync with them
     *
     * @param type (String) : The type of resync request, can either be "players" or "gm"
     * @param senderId (String) : The userId of the player requesting the resync event
     * @param data (Object) : The data payload of the resync request. If the type is
     *                        "players" then chain process this as a resync event rather
     *                        than a request.
     *
     * @private
     */
    private _processResyncRequest;
    /**
     * Process a resync event, and if valid, unload all inserts, prepare assets for inserts to inject,
     * and inject them.
     *
     * @param type (String) : The type of the resync event, can either be "player" or "gm" indicating
     *                        the permission level of the sender (only player or gm atm).
     * @param senderId (String) : The userId of the player whom sent the resync event.
     * @param data (Object) : The data of the resync Event which will contain the
     *                        information of the inserts we need to load in.
     * @private
     */
    private _processResyncEvent;
    /**
     * Process a scene update payload
     *
     * if we receive an event of the same type that is older
     * than one we've already resceived, notify, and drop it.
     *
     * Scene Events
     *
     * enterscene : an insert was injected remotely
     * exitscene : an insert was removed remotely
     * positionupdate : an insert was moved removely
     * push : an insert was pushed removely
     * swap : an insert was swapped remotely
     * emote : an emote was triggered removely
     * addtexture : a texture asset was added remotely
     * addalltextures : a group of textures were added remotely
     * state : an insert's assets were staged remotely
     * narrator : the narrator bar was activated remotely
     * decaytext : an insert's text was decayed remotely
     * renderinsert : an insert is requesting to be rendered immeidately remotely
     *
     * @params senderId (String) : The userId of the playerId whom sent the scene event
     * @params type (String) : The scene event subtype to process, and is represented in the data object
     * @params data (Object) : An object whose properties contain the relevenat data needed for each scene subtype
     *
     * @private
     */
    private _processSceneEvent;
    /**
     * Merely getting the typing event is the payload, we just refresh the typing timout
     * for the given userId
     */
    /**
     * Process a typing event payload
     *
     * @param userId (String) : The userId of the user that is typing
     * @param data (Object) : The Object payload that contains the typing event data
     *
     * @private
     */
    private _processTypingEvent;
    /**
     * Test wither a user is typing given user id
     *
     * @param userId (String) : The userId of user to check
     */
    isUserTyping(userId: any): any;
    /**
     * Get the text color given the insert
     *
     * @param insert (Object) : An object represeting an insert
     *
     * @return (String) The text color active for the insert.
     *
     * @private
     */
    private _getTextColorFromInsert;
    /**
     * Get the text size given the insert
     *
     * @param insert (Object) : An object represeting an insert
     *
     * @return (String) The text size active for the insert.
     *
     * @private
     */
    private _getTextSizeFromInsert;
    /**
     * Get the text font given the insert
     *
     * @param insert (Object) : An object represeting an insert
     *
     * @return (String) The text font active for the insert.
     *
     * @private
     */
    private _getTextFontFromInsert;
    /**
     * Get the text fly-in animation given the insert
     *
     * @param insert (Object) : An object represeting an insert
     *
     * @return (String) The text flyin active for the insert.
     *
     * @private
     */
    private _getTextFlyinFromInsert;
    /**
     * Get the text standing animation given the insert
     *
     * @param insert (Object) : An object represeting an insert
     *
     * @return (String) The text standing active for the insert.
     *
     * @private
     */
    private _getTextStandingFromInsert;
    /**
     * Get the insert emote given the insert
     *
     * @param insert (Object) : An object represeting an insert
     *
     * @return (String) The emote active for the insert.
     *
     * @private
     */
    private _getEmoteFromInsert;
    /**
     * Get the inserts which are typing based on if their users are typing
     */
    getInsertsTyping(): string[];
    /**
     * Set the user emote state, and change the insert if one is active for that
     * user.
     *
     * @param userId (String) : The userId of the user whom triggered the emote state change
     * @param theatreId (String) : The theatreId of the insert that is changing
     * @param subType (String) : The subtype of the emote state that is being changed
     * @param value (String) : The value of the emote state that is being set
     * @param remote (Boolean) : Boolean indicating if this is a remote or local action
     */
    setUserEmote(userId: any, theatreId: any, subType: any, value: any, remote: any): void;
    /**
     * set the user as typing, and or update the last typed
     *
     * @param userId (String) : The userId of the user that is to be set as 'typing'.
     * @param theatreId (String) : The theatreId the user is 'typing' as.
     */
    setUserTyping(userId: any, theatreId: any): void;
    /**
     * set the user as no longer typing
     *
     * @param userId (String) : The userId to remove as 'typing'.
     */
    removeUserTyping(userId: any): void;
    /**
     * Pull insert theatre parameters from an actor if possible
     *
     * @param actorId (String) : The actor Id from which to pull theatre insert data from
     *
     * @return (Object) : An object containing the parameters of the insert given the actor Id
     *                     or null.
     * @private
     */
    private _getInsertParamsFromActorId;
    /**
     * Determine if the default animations are disabled given a theatreId
     *
     * @param theatreId (String) : The theatreId who's theatre properties to
     *                             test for if the default animations are disabled.
     *
     * @return (Boolean) : True if disabled, false if not, null if the actor
     *                      does not exist
     */
    isDefaultDisabled(theatreId: any): boolean;
    /**
     * Given the userId and theatreId, determine of the user is an 'owner'
     *
     * @params userId (String) : The userId of the user to check.
     * @params theatreId (String) : The theatreId of insert to check.
     *
     * @return (Boolean) : True if the userId owns the actor, False otherwise
     *                      including if the actor for the theatreId does not exist.
     */
    isActorOwner(userId: any, theatreId: any): boolean;
    /**
     * Is the theatreId of a player controlled actor?
     *
     * @params theatreId (String) : The theatreId of the insert to checkA
     *
     * @return (Boolean) : True if the insert is player controlled, False otherwise
     */
    isPlayerOwned(theatreId: any): boolean;
    /**
     * Immediately render this insert if it is active with whatever
     * parameters it has
     *
     * @params id (String) : The theatreId of the insert to render.
     */
    renderInsertById(id: any): Promise<void>;
    /**
     * Initialize the tooltip canvas which renders previews for the emote menu
     *
     * @return (HTMLElement) : The canvas HTMLElement of the PIXI canvas created, or
     *                          null if unsuccessful.
     * @private
     */
    private _initTheatreToolTip;
    /**
     * configure the theatre tool tip based on the provided
     * insert, if none is provided, the do nothing
     *
     * @params theatreId (String) : The theatreId of the insert to display in
     *                              the theatre tool tip.
     * @params emote (String) : The emote of the theatreId to get for dispay
     *                          in the theatre tool tip.
     */
    configureTheatreToolTip(theatreId: any, emote: any): Promise<void>;
    /**
     * Inititalize Face API
     *
     *
     * @private
     */
    private _initFaceAPI;
    /**
     * Create the initial dock canvas, future 'portraits'
     * will be PIXI containers whom are sized to the portraits
     * that they contain.
     *
     * @return (HTMLElement) : The canvas HTMLElement of the created PIXI Canvas,
     *                          or null if unsuccessful.
     * @private
     */
    private _initTheatreDockCanvas;
    /**
     * Our efficient render loop? We want to render only when there's a tween running, if
     * there's no animation handler running, we don't need to request an animation frame
     *
     * We do this by checking for a non-zero accumulator that increments when a handler
     * is added, and decrements when a handler is removed, thus if the accumulator is > 0
     * then there's something to animate, else there's nothing to animate, and thus nothing
     * to render!
     *
     * @params time (Number) : The high resolution time, typically from performace.now() to
     *                         update all current animation sequences within the PIXI context.
     * @private
     */
    private _renderTheatre;
    /**
     * Add a dock tween animation, and increment our accumulator, start requesting animation frames
     * if we aren't already requesting them
     *
     * @params imgId (String) : The theatreId of the tween that will be receiving it.
     * @params tween (Object TweenMax) : The TweenMax object of the tween to be added.
     * @params tweenId (String) : The tweenId for this tween to be added.
     *
     * @private
     */
    private _addDockTween;
    /**
     * Remove a dock tween animation, and decrement our accumulator, if the accumulator <= 0, the render
     * loop will kill itself after the next render. Thus no model updates need be performed
     *
     * @params imgId (String) : The theatreId of the tween that will have it removed.
     * @params tween (Object TweenMax) : The TweenMax object of the tween to be removed.
     * @params tweenId (String) : The tweenId of the tween to be removed.
     *
     * @private
     */
    private _removeDockTween;
    /**
     * Destroy a PIXI container in our dock by removing all animations it may have
     * as well as destroying its children before destroying itself
     *
     * @params imgId (String) : The theatreId of the insert whose dockContainer will be destroyed.
     *
     * @private
     */
    private _destroyPortraitDock;
    /**
     * Create, and track the PIXIContainer for the provided image source within
     * our dock canvas
     *
     * @params imgPath (String) : The path of the image to initialize with when
     *                            creating the PIXIContainer.
     * @params portName (String) : The name label for the insert in the container.
     * @params imgId (String) : The theatreId for this container.
     * @params optAlign (String) : The optAlign parameter denoting the insert's alignment.
     * @params emotes (Object) : An Object containing properties pretaining to the emote state
     *                           to initialize the container with.
     * @params isLeft (Boolean) : Boolean to determine if this portrait should be injected
     *                            left, or right in the dock after creation.
     *
     * @private
     */
    private _createPortraitPIXIContainer;
    /**
     * Sets up a portrait's PIXI dockContainer to size to
     * the given resource
     *
     * @params imgId (String) : The theatreId of the insert whose portrait we're setting up.
     * @params resName (String) : The resource name of the sprite to configure.
     * @params reorder (Boolean) : Boolean to indicate if a reorder should be performed after
     *                             an update.
     *
     * @private
     */
    private _setupPortraitContainer;
    /**
     *
     * Updates the PIXIText containing our debug information.
     *
     * @params insert (Objet) : An Object represeting the insert
     *
     * @private
     */
    private _updateTheatreDebugInfo;
    /**
     * Reposition insert elements based
     * on nameOrientation label length,
     * and textBox position
     *
     * @params insert (Object) : An Object representing the insert
     *
     * @private
     */
    private _repositionInsertElements;
    /**
     * Add Resource
     *
     * We want to add an asset to the the PIXI Loader
     *
     * @params imgSrc (String) : The url of the image that will replace the resource
     * @params resName (String) : The resource name to replace
     * @params imgId (String) : The theatreId of the insert whose resource is being replaced
     * @params cb (Function) : The callback to invoke once we're done replacing the resource
     * @params remote (Boolean) : Boolean indicating if thist call is being done remotely or locally.
     *
     * @private
     */
    private _AddTextureResource;
    /**
     * Add All Texture Resources
     *
     * Add an array of assets to the PIXI Loader
     *
     * @param imgSrcs (Array) : An array of Objects consiting of {imgsrc: <value>, resname: <value>}
     *                          of the resources to replace.
     * @param imgId (String) : The TheatreId of the insert whose textures will be replaced.
     * @param emote (String) : The currently active emote, if any.
     * @param cb (Function) : The function callback to invoke when the resources are loaded.
     * @param remote (Boolean) : Wither or not this function is being invoked remotely, if not, then
     *                           we want to broadcast to all other clients to perform the action as well.
     *
     * @private
     */
    private _AddAllTextureResources;
    /**
     * Clear the container by ending all animations, and removing all sprites
     *
     * @param imgId : The theatreId of the insert whose dockContainer we should
     *                clear.
     *
     * @private
     */
    private _clearPortraitContainer;
    /**
     * Add sprites to the PIXI Loader
     *
     * @params imcSrcs (Array[Object]) : An array of {imgsrc: (String), resname (String)} pairs
     *                                   representing the assets to be loaded into PIXI's loader.
     * @params cb (Function) : The function to invoke once the assets are loaded.
     *
     * @private
     */
    private _addSpritesToPixi;
    /**
     * Given an array of theatreIds, stage them all
     *
     * @params ids (Array[(String)] : An array of theatreIds of inserts to load.
     * @params cb (Function) : The function to invoke once the assets are loaded.
     */
    stageAllInserts(ids: any): Promise<void>;
    /**
     * "Stages" an insert by pre-loading the base + all emote images
     *
     * @params theatreId (String) : The theatreId of the insert to load.
     * @params remote (Boolean) : Whether this is being invoked remotely or locally.
     */
    stageInsertById(theatreId: any, remote: any): Promise<any>;
    /**
     * Set the emote given the id
     *
     * @params ename (String) : The emote name.
     * @params id (String) : The theatreId of the insert.
     * @params remote (Boolean) : Wither this is being invoked remotely or locally.
     */
    setEmoteForInsertById(ename: any, id: any, remote: any): void;
    /**
     * Set the emote given the name
     *
     * @params ename (String) : The emote name.
     * @params name (String) : The label name of the insert.
     * @params remote (Boolean) : Wither this is being invoked remotely or locally.
     */
    setEmoteForInsertByName(ename: any, name: any, remote: any): void;
    /**
     * Set the emote given the insert
     * the moment the insert is in the RP bar
     *
     * @params ename (String) : The emote name.
     * @params insert (Object) : An Object representing the insert.
     * @params remote (Boolean) : Wither this is being invoked remotely or locally.
     *
     * @private
     */
    private _setEmoteForInsert;
    /**
     * Scour the theatreBar for all text boxes
     *
     * @return (Array[HTMLElement]) : An array of HTMLElements which are the textboxes
     *
     * @private
     */
    private _getTextBoxes;
    /**
     * Get the text box given the theatreId
     *
     * @params id (String) : The theatreId of the insert/textbox
     *
     * @return (HTMLELement) : The HTMLElement which is the textbox, or undefined if it
     *                          does not exist.
     *
     * @private
     */
    private _getTextBoxById;
    /**
     * Get the text box given the label name
     *
     * @params id (String) : The label name of the insert/textbox
     *
     * @return (HTMLELement) : The HTMLElement which is the textbox, or undefined if it
     *                          does not exist.
     *
     * @private
     */
    private _getTextBoxByName;
    /**
     * Add a textBox to the theatreBar
     *
     * @params textBox (HTMLElement) : The textBox to add to the theatreBar,
     *                                 MUST correspond to an insert.
     * @params isLeft (Boolean) : Wither this textBox should be injected Left or Right.
     *
     * @private
     */
    private _addTextBoxToTheatreBar;
    /**
     * Remove a textBox from the theatreBar
     *
     * @param textBox (HTMLElement : div) : the textBox to add to the theatreBar,
     *                                      MUST correspond to an insert.
     *
     * @private
     */
    private _removeTextBoxFromTheatreBar;
    /**
     * Given an image, path, attempt to inject it on the left
     *
     * @params imgPath (String) : The path to the image that will be used for the initial portrait.
     * @params portName (String) : The name that will be applied to the portrait's label.
     * @params ImgId (String) : The theatreId that will be assigned to this insert (must be "theatre-<ID>")
     * @params optAlign (String) : The alignment mode to use. Currently only "top" and "bottom" are accepted.
     * @params emotions (Object) : An Object containing the emote states to launch with.
     * @params remote (Boolean) : Boolean indicating if this is being invoked remotely, or locally.
     */
    injectLeftPortrait(imgPath: any, portName: any, imgId: any, optAlign: any, emotions: any, remote: any): Promise<void>;
    /**
     * Given an image, path, attempt to inject it on the right
     *
     * @params imgPath (String) : The path to the image that will be used for the initial portrait.
     * @params portName (String) : The name that will be applied to the portrait's label.
     * @params ImgId (String) : The theatreId that will be assigned to this insert (must be "theatre-<ID>")
     * @params optAlign (String) : The alignment mode to use. Currently only "top" and "bottom" are accepted.
     * @params emotions (Object) : An Object containing the emote states to launch with.
     * @params remote (Boolean) : Boolean indicating if this is being invoked remotely, or locally.
     */
    injectRightPortrait(imgPath: any, portName: any, imgId: any, optAlign: any, emotions: any, remote: any): Promise<void>;
    /**
     * Removes insert by ID
     *
     * @params id (String) : The theatreId of the insert to remove.
     * @params remote (Boolean) : Boolean indicating if this is being invoked remotely, or locally.
     *
     * @return (Object) : An object containing the items that were removed {insert : (Object), textBox: (HTMLElement)}
     *                     or null if there was nothing to remove.
     */
    removeInsertById(id: any, remote: any): {
      insert: any;
      textBox: any;
    };
    /**
     * Removes insert by name, in the event that there
     * are inserts with the same name, the first one is found
     * and removed.
     *
     * @params name (String) : The label name of the insert to remove.
     * @params remote (Boolean) : Boolean indicating if this is being invoked remotely, or locally.
     *
     * @return (Object) : An object containing the items that were removed {insert : (Object), textBox: (HTMLElement)}
     *                     or null if there was nothing to remove.
     */
    removeInsertByName(name: any, remote: any): {
      insert: any;
      textBox: any;
    };
    /**
     * Remove Inserts given the insert dock + corresponding TextBox
     *
     * @params toRemoveInsert (Object) : An Object representing the insert to be removed.
     * @params toRemoveTextBox (HTMLElement) : The textbox of the insert to be removed.
     * @params remote (Boolean) : Boolean indicating if this is being invoked remotely, or locally.
     *
     * @return (Object) : An object containing the items that were removed {insert : (Object), textBox: (HTMLElement)}
     *                     or null if there was nothing to remove.
     *
     * @private
     */
    private _removeInsert;
    /**
     * If the dock is active, a number > 0 will be returned indicating
     * the number of active Theatre Inserts in the dock. 0 meaning the dock
     * is inactive
     *
     * @return (Number) : The number of inserts in the dock
     */
    get dockActive(): number;
    /**
     * Get nav item by ID
     *
     * @params id (String) : The theatreId insert whose navItem we want.
     *
     * @return (HTMLElement) : The nav item, if found, else undefined.
     */
    getNavItemById(id: any): any;
    /**
     * Get nav item by Name
     *
     * @params name (String) : The label name of the insert whose navItem we want.
     *
     * @return (HTMLElement) : The nav item, if found, else undefined.
     */
    getNavItemByName(name: any): any;
    /**
     * Get bar text box by ID
     *
     * @params id (String) : The theatreId of an insert whose textBox we want.
     *
     * @return (HTMLElement) : The TextBox of the given theatreId, or undefined.
     */
    getTextBoxById(id: any): any;
    /**
     * Get bar text box by Name
     *
     * @params name (String) : The label name of an insert whose textBox we want.
     *
     * @return (HTMLElement) : The TextBox of the given theatreId, or undefined.
     */
    getTextBoxByName(name: any): any;
    /**
     * Get insert dock by ID
     *
     * @params id (String) : The theatreId of an insert we want.
     *
     * @return (Object) : The Object representing the insert, or undefined.
     */
    getInsertById(id: any): any;
    /**
     * Get insert dock by Name
     *
     * @params name (String) : The name of an insert we want.
     *
     * @return (Object) : The Object representing the insert, or undefined.
     */
    getInsertByName(name: any): any;
    /**
     * Get the portrait sprite given the insert
     *
     * @params insert (Object) : The Object representing the insert.
     *
     * @return (Object PIXISprite) : The PIXISprite portrait of the insert.
     *
     * @private
     */
    private _getPortraitSpriteFromInsert;
    /**
     * Get the portrait container given the insert
     *
     * @params insert (Object) : The Object representing the insert.
     *
     * @return (Object PIXIContainer) : The PIXIContainer portrait container of the sprite.
     *
     * @private
     */
    private _getPortraitContainerFromInsert;
    /**
     * Get the label sprite given the insert
     *
     * @params insert (Object) : The Object representing the insert.
     *
     * @return (Object PIXIText) : The PIXIText label of the insert.
     *
     * @private
     */
    private _getLabelFromInsert;
    /**
     * Gets the theatre's chat cover image
     *
     * @return (HTMLElement) : The <img> tag of the cover portrait in the
     *	chat message area.
     */
    getTheatreCoverPortrait(): HTMLImageElement;
    /**
     * Get speaking insert of /this/ user
     *
     * @return (Object) : The Object representing the insert that this
     *	User is speaking as, else undefined.
     */
    getSpeakingInsert(): any;
    /**
     * Get speaking name of /this/ user
     *
     * @return (Object PIXISprite) : The PIXISrite label of the insert the
     *	User is speaking as, else undefined.
     */
    getSpeakingLabel(): any;
    /**
     * Get speaking portrait container of /this/ user
     *
     * @return (Object PIXIContainer) : The PIXIContainer portrait container
     *	of the insert the User is speaking as, else undefined.
     */
    getSpeakingPortraitContainer(): any;
    /**
     * Get speaking textBox of /this/ user
     *
     * @return (HTMLElement) : The textBox of the insert the User is
     *	speaking as, else undefined.
     */
    getSpeakingTextBox(): any;
    /**
     * Swap Inserts by ID
     *
     * @params id1 (String) : The theatreId of the first insert to swap.
     * @params id2 (String) : The theatreId of the second insert to swap.
     * @params remote (Boolean) : Wither this is being invoked remotely, or locally.
     */
    swapInsertsById(id1: any, id2: any, remote: any): void;
    /**
     * Swap Inserts by Name
     *
     * @params name1 (String) : The label name of the first insert to swap.
     * @params name2 (String) : The label name of the second insert to swap.
     * @params remote (Boolean) : Wither this is being invoked remotely, or locally.
     */
    swapInsertsByName(name1: any, name2: any, remote: any): void;
    /**
     * Swaps Inserts
     *
     * @params insert1 (Object) : The Object representing the first insert to swap.
     * @params insert2 (Object) : The Object representing the second insert to swap.
     * @params textBox1 (HTMLELement) : The textBox of the first insert to swap.
     * @params textBox2 (HTMLELement) : The textBox of the second insert to swap.
     * @params remote (Boolean) : Wither this is being invoked remotely, or locally.
     *
     * @private
     */
    private _swapInserts;
    /**
     * Move  Inserts by ID
     *
     * @params id1 (String) : The theatreId of the destination insert to move to.
     * @params id2 (String) : The theatreId of insert to move.
     * @params remote (Boolean) : Wither this is being invoked remotely, or locally.
     */
    moveInsertById(id1: any, id2: any, remote: any): void;
    /**
     * Move an insert
     *
     * @params insert1 (Object) : The Object representing the destination insert.
     * @params insert2 (Object) : The Object representing insert to move
     *
     * @params textBox1 (HTMLELement) : The textBox of the destination textbox
     * @params textBox2 (HTMLELement) : The textBox of the textbox to move
     *
     * @params remote (Boolean) : Wither this is being invoked remotely, or locally.
     *
     * @private
     */
    private _moveInsert;
    /**
     * Is the textbox in the prime bar
     *
     * @params textBox (HTMLElement) : The textBox to check.
     *
     * @return (Boolean) True if the textBox is in the Prime Bar, false otherwise.
     *
     * @private
     */
    private _isTextBoxInPrimeBar;
    /**
     * Is the textbox in the second bar
     *
     * @params textBox (HTMLElement) : The textBox to check.
     *
     * @return (Boolean) True if the textBox is in the Second Bar, false otherwise.
     *
     * @private
     */
    private _isTextBoxInSecondBar;
    /**
     * Push Insert left or right of all others by Id
     *
     * @params id (String) : The theatreId of the insert to push.
     * @params isLeft (Boolean) : Wither we're pushing left or right.
     * @params remote (Boolean) : Wither this is being invoked remotely, or locally.
     */
    pushInsertById(id: any, isLeft: any, remote: any): void;
    /**
     * Push Insert left or right of all others by Name
     *
     * @params name (String) : The label name of the insert to push.
     * @params isLeft (Boolean) : Wither we're pushing left or right.
     * @params remote (Boolean) : Wither this is being invoked remotely, or locally.
     */
    pushInsertByName(name: any, isLeft: any, remote: any): void;
    /**
     * Push Insert left or right of all others
     *
     * @params insert (Object) : The Object represeting the insert.
     * @params textBox (HTMLElement) : The textBox of the insert.
     * @params isLeft (Boolean) : Wither we're pushing left or right.
     * @params remote (Boolean) : Wither this is being invoked remotely, or locally.
     *
     * @private
     */
    private _pushInsert;
    /**
     * Mirror a portrait by ID
     *
     * @params id (String) : The theatreId of the insert we wish to mirror.
     * @params remote (Boolean) : Wither this is being invoked remotely, or locally.
     */
    mirrorInsertById(id: any, remote: any): void;
    /**
     * Mirror a portrait by Name
     *
     * @params name (String) : The label name of the insert we wish to mirror.
     * @params remote (Boolean) : Wither this is being invoked remotely, or locally.
     */
    mirrorInsertByName(name: any, remote: any): void;
    /**
     * Is an insertMirrored give Id
     *
     * @params id (String) : The theatreId of the insert we wish to mirror.
     * return (Boolean) : True if the insert is mirrored, false otherwise.
     */
    isInsertMirrored(id: any): any;
    /**
     * Mirror a portrait
     *
     * @params insert (Object) : The Object represeting the insert.
     * @params remote (Boolean) : Wither this is being invoked remotely, or locally.
     *
     * @private
     */
    private _mirrorInsert;
    /**
     * Reset an insert's postion/mirror state by Id
     *
     * @param id (String) : The theatreId of the insert to reset.
     * @params remote (Boolean) : Wither this is being invoked remotely, or locally.
     */
    resetInsertById(id: any, remote: any): void;
    /**
     * Reset an insert's postion/mirror state by Id
     *
     * @param name (String) : The name label of the insert to reset.
     * @params remote (Boolean) : Wither this is being invoked remotely, or locally.
     */
    resetInsertByName(name: any, remote: any): void;
    /**
     * Resets a portrait position/morror state
     *
     * @params insert (Object) : The Object represeting an insert.
     * @params remote (Boolean) : Wither this is being invoked remotely, or locally.
     *
     * @private
     */
    private _resetPortraitPosition;
    /**
     * first verify, then immediately execute the set of tweens
     * defined in the animation syntax.
     *
     * If any tweens in the syntax are incorrect, none are executed, and
     * an empty array is returned indicating no tweens were performed
     *
     * Return an array of tweens applied to the target container
     *
     * @params animName (String) : The animation name.
     * @params animSyntax (String) : The animation syntax.
     * @params resMap (Array[Object]) : The resource map to use consisting of
     *                                  {name: (String), path: (String)} tuples.
     * @params insert (Object) :  The object represeting the insert that will contain this
     *                            animation.
     */
    addTweensFromAnimationSyntax(animName: any, animSyntax: any, resMap: any, insert: any): Promise<void>;
    /**
     * Given the insert params, return the correct
     * intitial emotion set when displaying an insert
     * which was previously staged, or not active
     *
     * first : actor.flags.theatre.<emote>.settings.<parameter>
     * second : actor.flags.theatre.settings.<parameter>
     * third : Theatre.instance.userEmotes[<userid>].<parameter>
     *
     * @params params (Object) : The set of emotion properties.
     * @params userDefault (Boolean) : Wither to use the default user settings over the
     *                                 settings in the params object.
     *
     * @return (Object) : The object containing the emotion properties to be used.
     *
     * @private
     */
    private _getInitialEmotionSetFromInsertParams;
    /**
     * Activate an insert by Id, if it is staged to the navbar
     *
     * @params id (String) : The theatreId of the insert to activate.
     * @params ev (Event) : The event that possibly triggered this activation.
     */
    activateInsertById(id: any, ev: any): Promise<void>;
    /**
     * immediately decays a textbox's contents by shifting them down, and
     * fading it away
     *
     * @params theatreId (String) : The theatreId of the textBox we want to decay.
     * @params remote (Boolean) : Wither this is being invoked remotely, or locally.
     */
    decayTextBoxById(theatreId: any, remote: any): void;
    /**
     * Applies the player color to the textbox as
     * a box-shadow, and background highlight.
     *
     * @params textBox (HTMLElement) : The textBox to apply the color to.
     * @params userId (String) : The User's Id.
     * @params color (String) : The CSS color string to use if available.
     */
    applyPlayerColorToTextBox(textBox: any, userId: any, color: any): void;
    /**
     * Gets the player 'flash' color that tints the insert as it 'pops.
     *
     * @params userId (String) : The User's Id.
     * @params color (String) : The CSS color string to use if available.
     *
     * @return (String) : The CSS color to be used for the color flash.
     */
    getPlayerFlashColor(userId: any, color: any): string;
    /**
     * Apply the font family to the given element
     *
     * @params elem (HTMLElement) : The HTMLElement to apply the font family to.
     * @params fontFamily (String) : The name of the font family to add.
     *
     * @private
     */
    private _applyFontFamily;
    /**
     * Toggle the narrator bar
     *
     * @param active (Boolean) : Wither to activate or deactive the narrator bar.
     * @param remote (Boolean) : Winter this is being invoked remotely, or locally.
     */
    toggleNarratorBar(active: any, remote: any): void;
    /**
     * Render the emote menu
     */
    renderEmoteMenu(): void;
    /**
     * ============================================================
     *
     * Internal Theatre handlers
     *
     * ============================================================
     */
    /**
     * Handle the window resize eventWindow was resized
     *
     * @param ev (Event) : Event that triggered this handler
     */
    handleWindowResize(ev: any): void;
    /**
     * Store mouse position for our tooltip which will roam
     *
     * @param ev (Event) : The Event that triggered the mouse move.
     */
    handleEmoteMenuMouseMove(ev: any): void;
    /**
     * Handle the emote click
     *
     * @param ev (Event) : The Event that triggered this handler
     */
    handleBtnEmoteClick(ev: any): void;
    /**
     * Handle chat-message focusOut
     *
     * @param ev (Event) : The Event that triggered this handler
     */
    handleChatMessageFocusOut(ev: any): void;
    /**
     * Handle chat-message keyUp
     *
     * @param ev (Event) : The Event that triggered this handler
     */
    handleChatMessageKeyUp(ev: any): void;
    /**
     * Handle key-down events in the #chat-message area to fire
     * "typing" events to connected clients
     *
     * @param ev (Event) : The Event that triggered this handler
     */
    handleChatMessageKeyDown(ev: any): void;
    /**
     * Handle the narrator click
     *
     * NOTE: this has issues with multiple GMs since the narrator bar currently works as a
     * "shim" in that it pretends to be a proper insert for text purposes only.
     *
     * If another GM activates another charater, it will minimize the bar for a GM that is trying
     * to use the bar
     *
     * @param ev (Event) : The Event that triggered this handler
     */
    handleBtnNarratorClick(ev: any): void;
    /**
     * Handle the CutIn toggle click
     *
     * @param ev (Event) : The Event that triggered this handler
     */
    handleBtnCinemaClick(ev: any): void;
    /**
     * Handle the Delay Emote toggle click
     *
     * @param ev (Event) : The Event that triggered this handler
     */
    handleBtnDelayEmoteClick(ev: any): void;
    /**
     * Handle the Quote toggle click
     *
     * @param ev (Event) : The Event that triggered this handler
     */
    handleBtnQuoteClick(ev: any): void;
    /**
     * Handle the resync click
     *
     * @param ev (Event) : The Event that triggered this handler
     */
    handleBtnResyncClick(ev: any): void;
    /**
     * Handle the supression click
     *
     * @param ev (Event) : The Event that triggered this handler
     */
    handleBtnSuppressClick(ev: any): void;
    updateSuppression(suppress: any): void;
    /**
     * Handle naveBar Wheel
     *
     * @param ev (Event) : The Event that triggered this handler
     */
    handleNavBarWheel(ev: any): void;
    /**
     * Handle textBox Mouse Double Click
     *
     * @param ev (Event) : The Event that triggered this handler
     */
    handleTextBoxMouseDoubleClick(ev: any): void;
    /**
     * Handle window mouse up
     *
     * @param ev (Event) : The Event that triggered this handler
     */
    handleWindowMouseUp(ev: any): void;
    /**
     * Handle textBox MouseDown
     *
     * @param ev (Event) : The Event that triggered this handler
     */
    handleTextBoxMouseDown(ev: any): void;
    /**
     * Handle textBox mouse up
     *
     * @param ev (Event) : The Event that triggered this handler
     */
    handleTextBoxMouseUp(ev: any): void;
    /**
     * Handle a nav item dragstart
     *
     * @param ev (Event) : The Event that triggered this handler
     */
    handleNavItemDragStart(ev: any): void;
    /**
     * Handle a nav item dragend
     *
     * @param ev (Event) : The Event that triggered this handler
     */
    handleNavItemDragEnd(ev: any): void;
    /**
     * Handle a nav item dragover
     *
     * @param ev (Event) : The Event that triggered this handler
     */
    handleNavItemDragOver(ev: any): void;
    /**
     * Handle a nav item dragdrop
     *
     * @param ev (Event) : The Event that triggered this handler
     */
    handleNavItemDragDrop(ev: any): void;
    /**
     * Handle mouse up on navItems
     *
     * @param ev (Event) : The Event that triggered this handler
     */
    handleNavItemMouseUp(ev: any): void;
    /**
     * Removes the actor from the stage.
     *
     * @params id (string) : The theatreId to remove from the stage.
     */
    _removeFromStage(theatreId: any): any;
  }

}