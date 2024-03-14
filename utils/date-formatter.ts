export default (date_as_string: string, locale = "fr") => {
  const d = new Date(date_as_string);
  const formatter = new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
  });
  return formatter.format(d);
};
