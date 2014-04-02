/*
 * Copyright (c) Microsoft Open Technologies, Inc. Licensed under the Apache License, Version 2.0 (the "License").
 */
package org.apache.cordova.contacts;

import java.util.HashMap;

import org.json.JSONArray;
import org.json.JSONObject;

public class ContactInfoDTO {

 String displayName;
 JSONObject name;
 JSONArray organizations;
 JSONArray addresses;
 JSONArray phones;
 JSONArray emails;
 JSONArray ims;
 JSONArray websites;
 JSONArray photos;
 String note;
 String nickname;
 String birthday;
 HashMap<String, Object> desiredFieldsWithVals;

 public ContactInfoDTO() {

  displayName = "";
  name = new JSONObject();
  organizations = new JSONArray();
  addresses = new JSONArray();
  phones = new JSONArray();
  emails = new JSONArray();
  ims = new JSONArray();
  websites = new JSONArray();
  photos = new JSONArray();
  note = "";
  nickname = "";
  desiredFieldsWithVals = new HashMap<String, Object>();
 }

}
