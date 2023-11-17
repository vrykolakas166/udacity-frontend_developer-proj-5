import { countDate, getWeatherIconCdnLink } from "../../client/js/func/helpers";

describe("Testing helper funcs", () => {
  test("Testing countDate function", () => {
    let d = new Date();
    var x = countDate(d.setDate(new Date().getDate() + 7));
    expect(x).toBe("7 days");
  });

  test("Test getWeatherIconCdnLink function", () => {
    let icon = "101dn";
    const endpoint = getWeatherIconCdnLink(icon);
    expect(endpoint).toBe(
      `https://cdn.weatherbit.io/static/img/icons/${icon}.png`
    );
  });
});
