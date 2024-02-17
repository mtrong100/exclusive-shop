export const displayPrice = (value: number) => {
  const price = value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return price;
};

export const displayRating = (value: string) => {
  const newValue = `${value} ⭐`;
  return newValue;
};

export const displayStar = (value: string) => {
  switch (value) {
    case "1":
      return "⭐";
    case "2":
      return "⭐⭐";
    case "3":
      return "⭐⭐⭐";
    case "4":
      return "⭐⭐⭐⭐";
    case "5":
      return "⭐⭐⭐⭐⭐";

    default:
      break;
  }
};

export const initFacebookSDK = () => {
  if (window.FB) {
    window.FB.XFBML.parse();
  }
  let locale = "vi_VN";
  window.fbAsyncInit = function () {
    window.FB.init({
      appId: import.meta.env.VITE_FB_APP_ID,
      xfbml: true,
      version: "v2.1",
    });
  };
  // Load the SDK asynchronously
  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = `//connect.facebook.net/${locale}/sdk.js`;
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
};
