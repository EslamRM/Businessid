const methods = {
  currency(value, currency, locale) {
    //   only works for edit order
    if (!currency) currency = this.order.items[0].currency;
    if (!locale) locale = "en-IN";
    const finalAmount = new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 2
    }).format(value);

    return finalAmount;
  },
  currencySymbol(amount, currencyCode) {
    const amountWithSymbol = this.currency(amount, currencyCode, "en");
    const result = /\s/g.test(amountWithSymbol);
    if (result) {
      return amountWithSymbol.split(/\s/g);
    } else {
      return [amountWithSymbol.substring(0, 1), amountWithSymbol.substring(1)];
    }
  },
  demandOrSupplyPrefix() {
    // if (
    //   this.$route.query &&
    //   this.$route.query.productId &&
    //   (this.$route.query.market_type === "demand" ||
    //     this.$route.query.market_type === "supply")
    // ) {
    //   return "Update";
    // } else
    if (this.$route.query && this.$route.query.market_type === "demand") {
      return "Demand";
    } else {
      return "Add";
    }
  }
};
export default methods;
