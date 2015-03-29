/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
 
$(function() {

    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */

    describe('RSS Feeds', function() {

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

        it('are defined', function() {
            // check if allFeeds is defined
            expect(allFeeds).toBeDefined();
            // check if allFeeds array not empty
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('url should be not empty', function(){
            allFeeds.forEach(function(item){
                // check if url is defined
                expect(item.url).not.toBeUndefined();
                expect(item.url).not.toBeNaN();
                // check if url is not null
                expect(item.url).not.toBeNull();
                // check if url is not empty string
                expect(item.url).not.toEqual('');
                // check if url is valid
                expect(/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/.test(item.url)).toBe(true);
            });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('name should be not empty', function(){
            allFeeds.forEach(function(item){
                // check if name is defined
                expect(item.name).not.toBeUndefined();
                expect(item.name).not.toBeNaN();
                // check if name is not null
                expect(item.name).not.toBeNull();
                // check if name is not empty string
                expect(item.name).not.toEqual('');
            });
        });

    });


    /* TODO: Write a new test suite named "The menu" */

    describe('The menu', function(){

        beforeEach(function() {
            // install clock for delayed checks
            jasmine.clock().install();
        });

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        it('should hidden by default', function(){
            
            // default value when menu is hidden
            expect($(".menu").css('transform')).toBe('matrix(1, 0, 0, 1, -192, 0)');

        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

        it('should visibility on/off on click', function(){
            
            // default value when menu is hidden
            expect($(".menu").css('transform')).toBe('matrix(1, 0, 0, 1, -192, 0)');
            
            // fire press action on menu icon programmatically
            $(".icon-list").click();

            // wait 50ms to click event take effect
            etTimeout(function(){
                // default value when menu is shown
                expect($(".menu").css('transform')).toBe('matrix(1, 0, 0, 1, 0, 0)');
            }, 50);

            // fire press action on menu icon programmatically
            $(".icon-list").click();

            // wait 50ms to click event take effect
            setTimeout(function(){
                // default value when menu is hidden
                expect($(".menu").css('transform')).toBe('matrix(1, 0, 0, 1, -192, 0)');
            }, 50);

        });

    });


    /* TODO: Write a new test suite named "Initial Entries" */

    describe('Initial Entries', function(){

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        // pointer to this inside function inside this scope
        var self = this;

        // condition trigger
        self.InitialComplete = false;

        beforeEach(function(done){
            
            // load feed
            loadFeed(0, function(){
                // condition test
                self.InitialComplete = $('.feed .entry').length >= 1;
                // trigger finish function call
                done();
            });

        });

        it('should load at least one feed', function(done){
            // check if InitialComplete is true
            expect(self.InitialComplete).toBe(true);
            // trigger finish function call
            done();
        });
        
    });


    /* TODO: Write a new test suite named "New Feed Selection"*/

    describe('New Feed Selection', function(){

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        // pointer to this inside function inside this scope
        var self = this;

        // condition trigger
        self.InitialComplete = false;
        // first feed count before call loadFeed
        self.count_before_loadfeed = $('.feed .entry').length;

        beforeEach(function(done){

            loadFeed(0, function(){
                // check if entry count is changed and set in InitialComplete
                self.InitialComplete = $('.feed .entry').length != self.count_before_loadfeed;
                // trigger finish function call
                done();
            });

        });

        it('should change its content when new data loaded', function(done){
            // check if InitialComplete is true
            expect(self.InitialComplete).toBe(true);
            // trigger finish function call
            done();
        });

    });

}());
