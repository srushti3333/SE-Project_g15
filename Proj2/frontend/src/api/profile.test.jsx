import API from "./axios";
import { fetchProfile, updateProfile } from "./profile";

jest.mock("./axios");

describe("profile API", () => {
  test("fetchProfile calls /profile", async () => {
    API.get.mockResolvedValueOnce({ data: { username: "bob" } });
    const res = await fetchProfile();
    expect(API.get).toHaveBeenCalledWith("/profile");
    expect(res).toEqual({ username: "bob" });
  });

  test("updateProfile calls PUT /profile", async () => {
    API.put.mockResolvedValueOnce({ data: { message: "ok" } });
    const data = { full_name: "Bob" };
    const res = await updateProfile(data);
    expect(API.put).toHaveBeenCalledWith("/profile", data, {});
    expect(res).toEqual({ message: "ok" });
  });
});
