/*
 * Copyright (c) Microsoft Open Technologies, Inc. Licensed under the Apache License, Version 2.0 (the "License").
 */

namespace WPCordovaClassLib.Cordova.Commands
{
    using System;
    using System.Linq;
    using System.Windows;
    using System.Windows.Controls;
    using System.Windows.Navigation;
    using Microsoft.Phone.Tasks;
    using Microsoft.Phone.UserData;
    using DeviceContacts = Microsoft.Phone.UserData.Contacts;

    /// <summary>
    /// Custom implemented class for picking single contact
    /// </summary>
    public partial class ContactPicker
    {
        #region Fields

        /// <summary>
        /// Result of ContactPicker call, represent contact returned.
        /// </summary>
        private ContactPickerTask.PickResult result;

        #endregion

        #region Constructors

        /// <summary>
        /// Initializes a new instance of the <see cref="ContactPicker"/> class. 
        /// </summary>
        public ContactPicker()
        {
            InitializeComponent();
            var cons = new DeviceContacts();
            cons.SearchCompleted += this.OnSearchCompleted;
            cons.SearchAsync(string.Empty, FilterKind.None, string.Empty);
        }

        #endregion

        #region Callbacks

        /// <summary>
        /// Occurs when contact is selected or pick operation cancelled.
        /// </summary>
        public event EventHandler<ContactPickerTask.PickResult> Completed;

        #endregion

        /// <summary>
        /// The on navigated from.
        /// </summary>
        /// <param name="e">
        /// The e.
        /// </param>
        protected override void OnNavigatedFrom(NavigationEventArgs e)
        {
            if (this.result == null)
            {
                this.Completed(this, new ContactPickerTask.PickResult(TaskResult.Cancel));
            }

            base.OnNavigatedFrom(e);
        }

        /// <summary>
        /// Called when contacts retrieval completed.
        /// </summary>
        /// <param name="sender">The sender.</param>
        /// <param name="e">The <see cref="ContactsSearchEventArgs"/> instance containing the event data.</param>
        private void OnSearchCompleted(object sender, ContactsSearchEventArgs e)
        {
            if (e.Results.Count() != 0)
            {
                lstContacts.ItemsSource = e.Results.ToList();
                lstContacts.Visibility = Visibility.Visible;
                NoContactsBlock.Visibility = Visibility.Collapsed;
            }
            else
            {
                lstContacts.Visibility = Visibility.Collapsed;
                NoContactsBlock.Visibility = Visibility.Visible;
            }
        }

        /// <summary>
        /// Called when any contact is selected.
        /// </summary>
        /// <param name="sender">
        /// The sender.
        /// </param>
        /// <param name="e">
        /// The e.
        /// </param>
        private void ContactsListSelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            this.result = new ContactPickerTask.PickResult(TaskResult.OK) { Contact = e.AddedItems[0] as Contact };
            this.Completed(this, this.result);

            if (NavigationService.CanGoBack)
            {
                NavigationService.GoBack();
            }
        }
    }
}