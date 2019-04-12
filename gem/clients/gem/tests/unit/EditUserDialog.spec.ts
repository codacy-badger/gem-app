import { mount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import EditUserDialog from "@/modules/admin/components/EditUserDialog.vue";
import { User } from "@/modules/types.ts";

Vue.use(Vuetify);

describe("EditUserDialog.vue", () => {
  const user: User = {
    id: 1,
    username: "johndoe",
    full_name: "John Doe",
    email: "johndoe@email.com",
    disabled: false
  };
  const wrapper = mount(EditUserDialog, {
    propsData: { user: user }
  });
  const name = wrapper.find({ ref: "name" });
  const email = wrapper.find({ ref: "email" });
  const close = wrapper.find("[data-ref='close']");
  const save = wrapper.find("[data-ref='save-user']");

  it("renders props.user when passed", () => {
    expect(name.props().value).toEqual(user.full_name);
    expect(email.props().value).toEqual(user.email);
  });

  it("sends close event when close button clicked", () => {
    close.trigger("click");
    expect(wrapper.props().visible).toEqual(false);
    expect(wrapper.emitted().close).toBeTruthy();
  });

  it("sends save event when save button clicked", () => {
    save.trigger("click");
    expect(wrapper.props().visible).toEqual(false);
    expect(wrapper.emitted().save).toBeTruthy();
    expect(wrapper.emitted().save[0][0]).toEqual(user);
  });

  it("sends changed entity when save button clicked", () => {
    const changedUser = {
      ...user,
      full_name: "changedName",
      email: "changedEmail"
    };

    name.find("input").setValue("changedName");
    email.find("input").setValue("changedEmail");
    save.trigger("click");

    expect(wrapper.emitted().save[0][0]).toEqual(changedUser);
  });
});
