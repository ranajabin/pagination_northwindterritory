sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, Filter, FilterOperator) {
        "use strict";

        var num;
        var clicks = 0;
        var count;
        var count1 = count - 5;

        return Controller.extend("territory1.northwindterritoryproject.controller.View1", {
            onInit: function () {
                debugger;
                var that = this;
                var Btn = this.getView().byId("btn_previous");
                Btn.setEnabled(false);

                var oModel1 = that.getOwnerComponent().getModel();
                // Pagination concept
                oModel1.read("/Territories", {
                    urlParameters: { $top: '10' },  // to Show only 10 records of table
                    //  {
                    success: function (oData) {
                        var count = oData.results.length;
                        var oODataJSONModel1 = new sap.ui.model.json.JSONModel();
                        oODataJSONModel1.setData(oData);
                        that.getView().setModel(oODataJSONModel1, "model1");


                    }
                });

                // this.onReadAll();
            },
            // onReadAll: function () {
            //     var oModel = this.getOwnerComponent().getModel();
            //     var t = this;
            //     oModel.read("/Territories",                 
            //      {
            //         success: function (Data) {
            //             var model1 = new sap.ui.model.json.JSONModel();
            //             model1.setData(Data);
            //             //  MessageBox.success("Success");

            //             t.getView().setModel(model1, "model1");
            //         },
            //         error: function (oError) {
            //             MessageBox.error("Error");
            //         }
            //     }
            //     );
            // },

            onPressNext: function () {
                debugger;
                var that = this;
                if (clicks < 0) {
                    clicks = 0;
                    clicks += 1;
                }
                else {
                    clicks += 1;
                };
                num = clicks * 5;
                this.count1;
                if (num === this.count1) {
                    var Btn = this.getView().byId("btn_next");
                    Btn.setEnabled(false);
                }
                if (num >= 5) {
                    var Btn = this.getView().byId("btn_previous");
                    Btn.setEnabled(true);
                }
                this.onReaddata();
            },

            onPressPre: function () {
                debugger;
                var that = this;
                clicks -= 1;
                if (clicks <= 0) {
                    num = 0;
                }
                else {
                    num = clicks * 5;
                };
                if (num < this.count1) {
                    var Btn = this.getView().byId("btn_next");
                    Btn.setEnabled(true);
                }
                if (num === 0) {
                    var Btn = this.getView().byId("btn_previous");
                    Btn.setEnabled(false);
                }
                that.onReaddata();
            },

            onReaddata: function () {
                debugger;
                var that = this;
                // var oModel3 = new sap.ui.model.odata.ODataModel(url); 
                var oModel3 = that.getOwnerComponent().getModel();
                oModel3.read("/Territories", {
                    urlParameters: { $skip: num, $top: '10' },  // Pagination concept of skip and top value
                    success: function (oData) {
                        var oODataJSONModel3 = new sap.ui.model.json.JSONModel();
                        oODataJSONModel3.setData(oData);
                        that.getView().setModel(oODataJSONModel3, "model1");
                    }
                });
            },


            onLoadDialog: function () {
                var myView = this.getView();
                var oDialog = myView.byId("idDialog");
                if (!oDialog) {
                    oDialog = sap.ui.xmlfragment(myView.getId(), "territory1.northwindterritoryproject.view.View1");
                    myView.addDependent(oDialog);
                }
                oDialog.open();
            },
            cancelpress: function () {
                this.byId("idDialog").close();
            },

            // okpress: function () {
            //     this.byId("idDialog").close();
            // },

            okpress: function (oEvent) {
                debugger;
                var sQuery = this.byId("rId").getValue();

                var oInput = this.byId("regionId").setValue(sQuery);

                var oTable = this.getView().byId("Tab"),
                    oBinding = oTable.getBinding("items");

                if (oEvent.getId() == "liveChange") {
                    sQuery = this.byId("regionId").getValue();
                }
                if (sQuery) {
                    var oFilter1 = new Filter("TerritoryID", "EQ", sQuery);
                    var oFilter2 = new Filter("TerritoryDescription", FilterOperator.Contains, sQuery);
                    var oFilter3 = new Filter("RegionID", "EQ", sQuery);

                    // var oFilter1 = new Filter("TerritoryID", FilterOperator.Contains, sQuery);
                    // var oFilter2 = new Filter("TerritoryDescription", FilterOperator.Contains, sQuery);
                    // var oFilter3 = new Filter("RegionID", FilterOperator.Contains, sQuery);

                    var aFilter = new Filter([oFilter1, oFilter2, oFilter3]);
                    // var aFilter = new Filter([oFilter1]);
                }
                oBinding.filter(aFilter);
                // }

                this.byId("idDialog").close();


            },

            // onFilterSearchTID: function (oEvent) {

            //     var sQuery = oEvent.getParameter("query"),
            //         oTable = this.getView().byId("Tab"),
            //         oBinding = oTable.getBinding("items");

            //     if (oEvent.getId() == "liveChange") {
            //         sQuery = oEvent.getParameter("query");
            //     }
            //     if (sQuery) {
            //         var oFilter1 = new Filter("TerritoryID", "EQ", sQuery);
            //         // var oFilter2 = new Filter("TerritoryDescription", FilterOperator.Contains, sQuery);
            //         // var oFilter3 = new Filter("RegionID", "EQ", sQuery);

            //         // var aFilter = new Filter([oFilter1, oFilter2, oFilter3]);
            //         var aFilter = new Filter([oFilter1]);
            //     }
            //     oBinding.filter(aFilter);
            // },

            // onFilterSearchTDesc: function (oEvent) {

            //     var sQuery = oEvent.getParameter("query"),
            //         oTable = this.getView().byId("Tab"),
            //         oBinding = oTable.getBinding("items");

            //     if (oEvent.getId() == "liveChange") {
            //         sQuery = oEvent.getParameter("query");
            //     }
            //     if (sQuery) {
            //         // var oFilter1 = new Filter("TerritoryID", "EQ", sQuery);
            //         var oFilter2 = new Filter("TerritoryDescription", FilterOperator.Contains, sQuery);
            //         // var oFilter3 = new Filter("RegionID", "EQ", sQuery);

            //      //   var aFilter = new Filter([oFilter1, oFilter2, oFilter3]);
            //         var aFilter = new Filter([oFilter2]);
            //     }
            //     oBinding.filter(aFilter);
            // },

            // onFilterSearchRID: function (oEvent) {

            //     var sQuery = oEvent.getParameter("query"),
            //         oTable = this.getView().byId("Tab"),
            //         oBinding = oTable.getBinding("items");

            //     if (oEvent.getId() == "liveChange") {
            //         sQuery = oEvent.getParameter("query");
            //     }
            //     if (sQuery) {
            //         // var oFilter1 = new Filter("TerritoryID", "EQ", sQuery);
            //         // var oFilter2 = new Filter("TerritoryDescription", FilterOperator.Contains, sQuery);
            //         var oFilter3 = new Filter("RegionID", "EQ", sQuery);

            //         // var aFilter = new Filter([oFilter1, oFilter2, oFilter3]);
            //         var aFilter = new Filter([oFilter3]);
            //     }
            //     oBinding.filter(aFilter);
            // },             


            onFilterSearch: function (oEvent) {
                debugger;

                var sQuery = oEvent.getParameter("query"),
                    oTable = this.getView().byId("Tab"),
                    oBinding = oTable.getBinding("items");

                if (oEvent.getId() == "liveChange") {
                    sQuery = oEvent.getParameter("query");
                }
                if (sQuery) {
                    var oFilter1 = new Filter("TerritoryID", "EQ", sQuery);
                    var oFilter2 = new Filter("TerritoryDescription", FilterOperator.Contains, sQuery);
                    var oFilter3 = new Filter("RegionID", "EQ", sQuery);

                    var aFilter = new Filter([oFilter1, oFilter2, oFilter3]);
                }
                oBinding.filter(aFilter);
            },
        });
    });

