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
    'use strict';
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has url', function() {
            for (var i = allFeeds.length - 1; i >= 0; i--) {
               expect(allFeeds[i].url).toBeDefined();
               expect(allFeeds[i].url).not.toBe("");
            }
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has name', function() {
            for (var i = allFeeds.length - 1; i >= 0; i--) {
               expect(allFeeds[i].name).toBeDefined();
               expect(allFeeds[i].name).not.toBe("");
            }
        });
    });


    /* Test suite named "The menu" */
    describe('The menu', function() {

        var check = function() {
            return $('body').hasClass('menu-hidden');
        }
        /* This test ensures that the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden', function() {
             
            expect(check()).toBe(true);
        });
         /* This test ensures that the menu changes
          * visibility when the menu icon is clicked.
          */
        it('changes when clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect(check()).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect(check()).toBe(true);
        })
    });

    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function(){
        /* This test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
         var data = null;
         beforeEach(function(done) {
            loadFeed(0, (function(bool) {
            if(bool === true) {
                data = $('.feed').html();
            }
            if(bool === false) {
                data = null;
            }
            done();

            }));    
        });
        it('has entry', function() {
            expect(data).not.toBeUndefined();
            expect(data).not.toBeNull();
        });
    })
    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* Test ensures that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * if the same feed is loaded it returns null and fails the test
         */
         var data;
        beforeEach(function(done){
            
            loadFeed(0, (function(bool) {
                if(bool === true) {
                    data = $('.feed').html();
                }
                if(bool === false) {
                    data = null;
                }
                done();
            }));
        });
        it('is changing content', function(done) {
            loadFeed(0, (function(bool) {
                var newData = $('.feed').html();
                if(bool === true && data != newData) {
                    data = newData;
                }

                else {
                    data = null;
                }
                expect(data).not.toBeUndefined();
                expect(data).not.toBeNull();
                done();
            }));
            
        });  
    });
}());
