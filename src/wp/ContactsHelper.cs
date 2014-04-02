/*
 * Copyright (c) Microsoft Open Technologies, Inc. Licensed under the Apache License, Version 2.0 (the "License").
 */

namespace WPCordovaClassLib.Cordova.Commands
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using Microsoft.Phone.UserData;

    /// <summary>
    /// Implements helper functionality to serialize contact to JSON string.
    /// </summary>
    internal static class ContactsHelper
    {
        /// <summary>
        /// Converts Contact object to string representation
        /// </summary>
        /// <param name="contact">Contact object</param>
        /// <param name="desiredFields">array of fields names</param>
        /// <returns>JSON string</returns>
        public static string ToJson(this Contact contact, string[] desiredFields)
        {
            var contactFieldsWithJsonVals = contact.PopulateContactDictionary();

            // if desiredFields are not defined, use all avilable fields
            if (desiredFields == null || desiredFields.Length == 0)
            {
                desiredFields = contactFieldsWithJsonVals.Keys.ToArray();
            }

            return FillResultWithFields(desiredFields, contactFieldsWithJsonVals);
        }

        /// <summary>
        /// Returns JSON string with desired fields only.
        /// </summary>
        /// <param name="desiredFields">The desired fields.</param>
        /// <param name="contactFieldsWithJsonVals">The contact fields with JSON values.</param>
        /// <returns>JSON string</returns>
        private static string FillResultWithFields(string[] desiredFields, Dictionary<string, Func<string>> contactFieldsWithJsonVals)
        {
            var result = new StringBuilder();
            for (int i = 0; i < desiredFields.Count(); i++)
            {
                if (!contactFieldsWithJsonVals.ContainsKey(desiredFields[i]))
                {
                    continue;
                }

                result.Append(contactFieldsWithJsonVals[desiredFields[i]]());
                if (i != desiredFields.Count() - 1)
                {
                    result.Append(",");
                }
            }

            return "{" + result + "}";
        }

        /// <summary>
        /// Populates the contact dictionary.
        /// </summary>
        /// <param name="contact">Contact, that converted to JSON</param>
        /// <returns>JSON string with populated data</returns>
        private static Dictionary<string, Func<string>> PopulateContactDictionary(this Contact contact)
        {
            var contactFieldsJsonValsDictionary = new Dictionary<string, Func<string>>(StringComparer.InvariantCultureIgnoreCase)
                {
                    { "id", () => string.Format("\"id\":\"{0}\"", contact.GetHashCode()) },
                    { "displayName", () => string.Format("\"displayName\":\"{0}\"", EscapeJson(contact.DisplayName)) },
                    {
                        "nickname",
                        () =>
                        string.Format(
                            "\"nickname\":\"{0}\"",
                            EscapeJson(contact.CompleteName != null ? contact.CompleteName.Nickname : string.Empty))
                    },
                    { "phoneNumbers", () => string.Format("\"phoneNumbers\":[{0}]", FormatJsonPhoneNumbers(contact)) },
                    { "emails", () => string.Format("\"emails\":[{0}]", FormatJsonEmails(contact)) },
                    { "addresses", () => string.Format("\"addresses\":[{0}]", FormatJsonAddresses(contact)) },
                    { "urls", () => string.Format("\"urls\":[{0}]", FormatJsonWebsites(contact)) },
                    { "name", () => string.Format("\"name\":{0}", FormatJsonName(contact)) },
                    { "note", () => string.Format("\"note\":\"{0}\"", EscapeJson(contact.Notes.FirstOrDefault())) },
                    {
                        "birthday",
                        () =>
                        string.Format(
                            "\"birthday\":\"{0}\"",
                            EscapeJson(Convert.ToString(contact.Birthdays.FirstOrDefault())))
                    }
                };
            return contactFieldsJsonValsDictionary;
        }

        /// <summary>
        /// Add escape characters to the JSON string.
        /// </summary>
        /// <param name="str">Input JSON formatted string</param>
        /// <returns>Escaped JSON string</returns>
        private static string EscapeJson(string str)
        {
            if (string.IsNullOrEmpty(str))
            {
                return str;
            }

            return str.Replace("\n", "\\n")
                      .Replace("\r", "\\r")
                      .Replace("\t", "\\t")
                      .Replace("\"", "\\\"")
                      .Replace("&", "\\&");
        }

        /// <summary>
        /// Formats phone numbers to JSON string.
        /// </summary>
        /// <param name="con">Contact object</param>
        /// <returns>JSON string</returns>
        private static string FormatJsonPhoneNumbers(Contact con)
        {
            string retVal = string.Empty;
            const string ContactFieldFormat = "\"type\":\"{0}\",\"value\":\"{1}\",\"pref\":\"false\"";
            foreach (ContactPhoneNumber number in con.PhoneNumbers)
            {
                string contactField = string.Format(ContactFieldFormat, number.Kind.ToString(), number.PhoneNumber);
                retVal += "{" + contactField + "},";
            }

            return retVal.TrimEnd(',');
        }

        /*
         *  formatted: The complete name of the contact. (DOMString)
            familyName: The contacts family name. (DOMString)
            givenName: The contacts given name. (DOMString)
            middleName: The contacts middle name. (DOMString)
            honorificPrefix: The contacts prefix (example Mr. or Dr.) (DOMString)
            honorificSuffix: The contacts suffix (example Esq.). (DOMString)
         */

        /// <summary>
        /// Formats the name to JSON string.
        /// </summary>
        /// <param name="con">Contact object</param>
        /// <returns>JSON string</returns>
        private static string FormatJsonName(Contact con)
        {
            string retVal;
            const string FormatStr = "\"formatted\":\"{0}\"," +
                               "\"familyName\":\"{1}\"," +
                               "\"givenName\":\"{2}\"," +
                               "\"middleName\":\"{3}\"," +
                               "\"honorificPrefix\":\"{4}\"," +
                               "\"honorificSuffix\":\"{5}\"";

            if (con.CompleteName != null)
            {
                retVal = string.Format(
                    FormatStr,
                    EscapeJson(con.CompleteName.FirstName + " " + con.CompleteName.LastName),
                    //// TODO: does this need suffix? middlename?
                    EscapeJson(con.CompleteName.LastName),
                    EscapeJson(con.CompleteName.FirstName),
                    EscapeJson(con.CompleteName.MiddleName),
                    EscapeJson(con.CompleteName.Title),
                    EscapeJson(con.CompleteName.Suffix));
            }
            else
            {
                retVal = string.Format(FormatStr, "", "", "", "", "", "");
            }

            return "{" + retVal + "}";
        }

        /// <summary>
        /// Format Emails to JSON string.
        /// </summary>
        /// <param name="con">Contact object</param>
        /// <returns>JSON string</returns>
        private static string FormatJsonEmails(Contact con)
        {
            string retVal = string.Empty;
            const string ContactFieldFormat = "\"type\":\"{0}\",\"value\":\"{1}\",\"pref\":\"false\"";
            foreach (ContactEmailAddress address in con.EmailAddresses)
            {
                string contactField = string.Format(
                    ContactFieldFormat,
                    address.Kind.ToString(),
                    EscapeJson(address.EmailAddress));

                retVal += "{" + contactField + "},";
            }

            return retVal.TrimEnd(',');
        }

        /// <summary>
        /// Format Addresses to JSON string.
        /// </summary>
        /// <param name="con">Contact object</param>
        /// <returns>JSON string</returns>
        private static string FormatJsonAddresses(Contact con)
        {
            string retVal = string.Empty;
            foreach (ContactAddress address in con.Addresses)
            {
                retVal += GetFormattedJsonAddress(address, false) + ",";
            }

            return retVal.TrimEnd(',');
        }

        /// <summary>
        /// Format Websites to JSON string.
        /// </summary>
        /// <param name="con">Contact object</param>
        /// <returns>JSON string</returns>
        private static string FormatJsonWebsites(Contact con)
        {
            string retVal = string.Empty;
            foreach (string website in con.Websites)
            {
                retVal += "\"" + EscapeJson(website) + "\",";
            }

            return retVal.TrimEnd(',');
        }

        /// <summary>
        /// Format single address to JSON string.
        /// </summary>
        /// <param name="address">
        /// Contact address.
        /// </param>
        /// <param name="isPrefered">
        /// Contact is preferred?
        /// </param>
        /// <returns>
        /// JSON string
        /// </returns>
        private static string GetFormattedJsonAddress(ContactAddress address, bool isPrefered)
        {
            const string AddressFormatString = "\"pref\":{0}," + // bool
                                         "\"type\":\"{1}\"," +
                                         "\"formatted\":\"{2}\"," +
                                         "\"streetAddress\":\"{3}\"," +
                                         "\"locality\":\"{4}\"," +
                                         "\"region\":\"{5}\"," +
                                         "\"postalCode\":\"{6}\"," +
                                         "\"country\":\"{7}\"";

            string formattedAddress = EscapeJson(address.PhysicalAddress.AddressLine1 + " "
                + address.PhysicalAddress.AddressLine2 + " "
                + address.PhysicalAddress.City + " "
                + address.PhysicalAddress.StateProvince + " "
                + address.PhysicalAddress.CountryRegion + " "
                + address.PhysicalAddress.PostalCode);

            string jsonAddress = string.Format(
                AddressFormatString,
                isPrefered ? "\"true\"" : "\"false\"",
                address.Kind.ToString(),
                formattedAddress,
                EscapeJson(address.PhysicalAddress.AddressLine1 + " " + address.PhysicalAddress.AddressLine2),
                address.PhysicalAddress.City,
                address.PhysicalAddress.StateProvince,
                address.PhysicalAddress.PostalCode,
                address.PhysicalAddress.CountryRegion);

            return "{" + jsonAddress + "}";
        }
    }
}