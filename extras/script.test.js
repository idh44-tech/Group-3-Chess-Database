
/**
 * @jest-environment jsdom
 */

const { addPlayer, main } = require("./index_script");

test("no input on player name nor rating value giving false", () => {
    document.body.innerHTML = `
        <form id="playerForm">
            <input type="text" id="Player Name" value="" />
            <input type="text" id="Rating" value="" />
            <input type="file" id="Player Image" />
        </form>
        <div id="Player-List"></div>
    `;
    main();
    const fakeEvent = { preventDefault: jest.fn() };
    expect(addPlayer(fakeEvent)).toBe(false);
}); 

test("only player name inputted giving false", () => {
    document.body.innerHTML = `
        <form id="playerForm">
            <input type="text" id="Player Name" value="fischer" />
            <input type="text" id="Rating" value="" />
            <input type="file" id="Player Image" />
        </form>
        <div id="Player-List"></div>
    `;
    main();
    const filledEvent = { preventDefault: jest.fn() };
    expect(addPlayer(filledEvent)).toBe(false);
});

test("only rating value inputted giving false", () => {
    document.body.innerHTML = `
        <form id="playerForm">
            <input type="text" id="Player Name" value="" />
            <input type="text" id="Rating" value="2785" />
            <input type="file" id="Player Image" />
        </form>
        <div id="Player-List"></div>
    `;
    main();
    const filledEvent = { preventDefault: jest.fn() };
    expect(addPlayer(filledEvent)).toBe(false);
});

test("both player name and rating value are inputted giving true", () => {
    document.body.innerHTML = `
        <form id="playerForm">
            <input type="text" id="Player Name" value="fischer" />
            <input type="text" id="Rating" value="2785" />
            <input type="file" id="Player Image" />
        </form>
        <div id="Player-List"></div>
    `;
    main();
    const filledEvent = { preventDefault: jest.fn() };
    expect(addPlayer(filledEvent)).toBe(true);
});

