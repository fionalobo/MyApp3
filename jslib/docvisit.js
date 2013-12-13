var DocApp = angular.module('DocApp', ['ngRoute','ui.bootstrap']);

function TypeaheadCtrl($scope) {
	$scope.selected = undefined;

	$scope.startsWith = function(fielditem, viewValue) {
        return fielditem.substr(0, viewValue.length).toLowerCase() == viewValue.toLowerCase();
    }
}

// Common Functions Factory
DocApp.factory('CommFnsFact', function () {
	var factory = {};

	factory.getCurDate = function () {
		var DateObj = new Date();
    	var CurDay, CurMonth, CurYear,CurDate;
    	CurDay = (DateObj.getDate() < 10 ? '0' + DateObj.getDate() : DateObj.getDate());
    	CurMonth = (DateObj.getMonth() < 10 ? '0' + DateObj.getMonth() : DateObj.getMonth());
    	CurYear = DateObj.getFullYear();

    	CurDate = CurYear + "-" + CurMonth + "-" + CurDay;

    	return CurDate;
	}

	factory.getCurTime = function () {
		var DateObj = new Date();
    	var CurHour, CurMin, CurTime;
		CurHour = (DateObj.getHours() < 10 ? '0' + DateObj.getHours() : DateObj.getHours());
    	CurMin = (DateObj.getMinutes() < 10 ? '0' + DateObj.getMinutes() : DateObj.getMinutes());

    	CurTime = CurHour + ":" + CurMin;

    	return CurTime;
	}

	return factory;
});

// Factory
DocApp.factory('DocVisFact', function (CommFnsFact) {
	var DataRecPtr = 0;
	var DocVisData = [{LocCd: 'GOA', EmpNo: '000001', VisDate: '2010-04-20', Town: 'BICHOLIM', DoctCd: 'PPANDIT', VisTime: '13:49', W_RecSeq: 1},
					  {LocCd: 'GOA', EmpNo: '000001', VisDate: '2010-04-20', Town: 'MAPUSA', DoctCd: 'PILLAMAN', VisTime: '13:56', W_RecSeq: 2},
					  {LocCd: 'GOA', EmpNo: '000001', VisDate: '2010-04-20', Town: 'VASCO', DoctCd: 'TPADHYE', VisTime: '16:56', W_RecSeq: 3},
					 ];

	DataRecPtr = DocVisData.length;

	var factory = {};

	factory.getDocVisData = function () {
		return DocVisData;
	}

	factory.getRecPtr = function () {
		return DataRecPtr;
	}

	factory.addDocVisData = function () {
		var DateObj = new Date();
    	var CurDay, CurMonth, CurYear, CurHour, CurMin;
    	CurDay = (DateObj.getDate() < 10 ? '0' + DateObj.getDate() : DateObj.getDate());
    	CurMonth = (DateObj.getMonth() < 10 ? '0' + DateObj.getMonth() : DateObj.getMonth());
    	CurYear = DateObj.getFullYear();
    	CurHour = (DateObj.getHours() < 10 ? '0' + DateObj.getHours() : DateObj.getHours());
    	CurMin = (DateObj.getMinutes() < 10 ? '0' + DateObj.getMinutes() : DateObj.getMinutes());
	
        var CurDate = CommFnsFact.getCurDate();
	    var CurTime = CommFnsFact.getCurTime();

		DocVisData.push({LocCd: 'GOA', EmpNo: '000001', VisDate: CurDate, Town: '', DoctCd: '', VisTime: CurTime, W_RecSeq: DataRecPtr + 1});
		DataRecPtr = DataRecPtr + 1;
	}

	factory.getRecord = function (nRecPtr) {
		return DocVisData[nRecPtr];
	}

	return factory;
});

DocApp.factory('docvisitdataObj', function () {
    var dataObj = {};
    
    //for pohd table
    dataObj.docvishd = {};
    dataObj.docvishd.emptySet = [{vistime: "", Town: "", DoctCd: ""}];
    dataObj.docvishd.querySet = [];

    dataObj.docvishd.editRec = [];
    dataObj.docvishd.preeditRec = [];
    angular.copy(dataObj.docvishd.emptySet, dataObj.docvishd.editRec);
    angular.copy(dataObj.docvishd.emptySet, dataObj.docvishd.preeditRec);

    dataObj.docvishd.curPtr = 0;
    dataObj.docvishd.curMode = 0; //0-show,1-edit,2-add
    dataObj.docvishd.lastOpr = ''; //last operation done

    dataObj.docvishd.cpkeysObj = {loccd: "", empno: "", visdate: "", vistime: ""}
    //for products table
    dataObj.docvishd.chkeysObj = {loccdx: "", empnox: "", visdatex: "", vistimex: ""}
    dataObj.docvishd.chkeysmap = {loccdx: "loccd", empnox: "empno", visdatex: "visdate", vistimex: "vistime"}
       
    dataObj.docvishd.state = [{Town:{ajax:false,valid:false,message:''},
    						   DoctCd:{ajax:false,valid:false,message:''}
    						  }
    						 ];


    //for pohd table
    dataObj.pohd = {};
    dataObj.pohd.emptySet = [{LocCd1 : '', VendorCd: '', Val1: '', Val2: '', Val3: 0, Val4: 0, Val5: '', Val6: 0, Val7: true, Val8:'PURCHASE CONDITIONS - Standard Terms\n\n\n1.	Order duly signed and issued on the order form of the company alone will be accepted.\n2.	The return post, confirming the delivery date and price accepted, must send acceptance of the orders. If the confirmation does not reach us within 15 days from the date of PO. It is implied that the PO is accepted as such.'}];

    dataObj.pohd.editRec = [];
    dataObj.pohd.preeditRec = [];
    angular.copy(dataObj.pohd.emptySet, dataObj.pohd.editRec);
    angular.copy(dataObj.pohd.emptySet, dataObj.pohd.preeditRec);

    dataObj.pohd.curPtr = 0;
    dataObj.pohd.curMode = 0; //0-show,1-edit,2-add
    dataObj.pohd.lastOpr = ''; //last operation done

    dataObj.pohd.cpkeysObj = {loccd: "", empno: "", visdate: "", vistime: ""}
    //for products table
    dataObj.pohd.chkeysObj = {loccdx: "", empnox: "", visdatex: "", vistimex: ""}
    dataObj.pohd.chkeysmap = {loccdx: "loccd", empnox: "empno", visdatex: "visdate", vistimex: "vistime"}

    dataObj.pohd.state = [{LocCd1:{ajax:false,valid:false,message:''},
    					   VendorCd:{ajax:false,valid:false,message:''},
    					   Val1:{ajax:false,valid:false,message:''}, 
    					   Val2:{ajax:false,valid:false,message:''}, 
    					   Val3:{ajax:false,valid:false,message:''}, 
    					   Val4:{ajax:false,valid:false,message:''}, 
    					   Val5:{ajax:false,valid:false,message:''}, 
    					   Val6:{ajax:false,valid:false,message:''}, 
    					   Val7:{ajax:false,valid:false,message:''}, 
    					   Val8:{ajax:false,valid:false,message:''}
                         }
                         ];

    dataObj.a2locmst = [{LocCd: 'AHM', LocName: 'Factory - Ahemedabad', RgnCd: 'NORTH'},{LocCd: 'BAN', LocName: 'Bengaluru  -Depo', RgnCd: 'SOUTH'},{LocCd: 'GOA', LocName: 'Factory Goa', RgnCd: 'SOUTH'}];
    dataObj.vendmst = [{LocCd: 'GOA', VendorCd: '000001-GOA', VendorName: 'Mohan Traders'},{LocCd: 'GOA', VendorCd: '000002-GOA', VendorName: 'Mohan Vijay Traders Pvt. Ltd.'},{LocCd: 'GOA', VendorCd: '000007-GOA', VendorName: 'Carl DCosta and Brothers Pvt. Ltd.'},{LocCd: 'BAN', VendorCd: 'BANVN1-BAN', VendorName: 'Bangalore Vendor1'},{LocCd: 'BAN', VendorCd: 'BANVN2-BAN', VendorName: 'Bangalore Vendor2'}];
   	dataObj.townmst = [{Town: 'BICHOLIM', State: 'GOA'},{Town: 'MAPUSA', State: 'GOA'},{Town: 'VASCO', State: 'GOA'},{Town: 'MARGAO', State: 'GOA'}];
   	dataObj.doctmst = [{DoctCd: 'PPANDIT', Town: 'BICHOLIM'}, {DoctCd: 'PILLAMAN', Town: 'MAPUSA'}, {DoctCd: 'PILLAMAN', Town: 'MARGAO'}, {DoctCd: 'SURAJ', Town: 'MARGAO'}, {DoctCd: 'Nazeem', Town: 'VASCO'}];

    return dataObj;
});

// Controller 1
DocApp.controller('DocVisitCtrl', ['$scope', 'DocVisFact', 'CommFnsFact', function ($scope, DocVisFact, CommFnsFact) {
	$scope.mytableSet = [];

	$scope.init = function () {
		$scope.mytableSet = DocVisFact.getDocVisData();
		$scope.searchVisDate = CommFnsFact.getCurDate();
	}

	$scope.init();
}]);

//Controller 2
DocApp.controller('DocVisAddCtrl', ['$scope', 'DocVisFact', 'docvisitdataObj', function ($scope, DocVisFact, dataObj) {

	//docvishd
    $scope.docvishd = dataObj.docvishd.editRec[0];
    var docvishd = $scope.docvishd;

    $scope.curMode = dataObj.docvishd.curMode;

    $scope.state_docvishd = dataObj.docvishd.state;
    var state_docvishd = $scope.state_docvishd ;

	$scope.townmst = [];
	angular.copy(dataObj.townmst, $scope.townmst);

	$scope.doctmst = [];
	angular.copy(dataObj.doctmst, $scope.doctmst);

    //pohd
    $scope.pohd = dataObj.pohd.editRec[0];
    var pohd = $scope.pohd;

    $scope.curMode = dataObj.pohd.curMode;

    $scope.state_pohd = dataObj.pohd.state[0];
    var state_pohd = $scope.state_pohd ;

	$scope.a2locmst = [];
	angular.copy(dataObj.a2locmst, $scope.a2locmst);    

	$scope.vendmst = [];
	angular.copy(dataObj.vendmst, $scope.vendmst);

	$scope.m = []
	$scope.m.VendorName = '';

    DocVisFact.addDocVisData();

	var RecPointer = DocVisFact.getRecPtr();

	$scope.mytable = DocVisFact.getRecord(RecPointer-1);

    $scope.onBlur = function (_cObjName) {
//        var onUpdateFn = "$scope.onUpdate_" + _cObjName +'()';
//        eval(onUpdateFn);

        var onValidateFn = "$scope.onValidate_" + _cObjName +'()';
        eval(onValidateFn);
    };

    $scope.OnPickVndCd = function ($item) {
    	$scope.m.VendorName = $item.VendorName;
    }

    $scope.OnPickVndNm = function ($item) {
    	$scope.pohd.VendorCd = $item.VendorCd;
    }

	//Vendor Name
    $scope.onUpdate_VendorName = function () {
	};

    $scope.onValidate_LocCd1 = function () {
		if ($scope.myForm.LocCd1.$invalid)
		{
			state_pohd.LocCd1.valid = false;
			state_pohd.LocCd1.message = "Error : Invalid Data entered.";

			if ($scope.myForm.LocCd1.$error.required)
			{
				state_pohd.LocCd1.message = "Error : Location must be specified.";
				return;
			};

			if ($scope.myForm.LocCd1.$error.pattern)
			{
				state_pohd.LocCd1.message = "Error : Invalid Data entered. Only Alpha-numeric data allowed.";
				return;
			};
		} 

		else
		{
			if (pohd.LocCd1.length != 3)
			{
				state_pohd.LocCd1.valid = false;
				state_pohd.LocCd1.message = "Error : Location must be filled completely.";
				return;
			};

			state_pohd.LocCd1.valid = true;
			state_pohd.LocCd1.message = "";
		};		
	};

	// Validate Val1
    $scope.onValidate_Val1 = function () {
		if ($scope.myForm.Val1.$invalid)
		{
			state_pohd.Val1.valid = false;
			state_pohd.Val1.message = "Error : Invalid Data entered.";
		} 
		else
		{
			state_pohd.Val1.valid = true;
			state_pohd.Val1.message = "";
		};		
	};

	// Validate Val2
    $scope.onValidate_Val2 = function () {
		if ($scope.myForm.Val2.$invalid)
		{
			state_pohd.Val2.valid = false;
			state_pohd.Val2.message = "Error : Invalid Data entered.";

			if ($scope.myForm.Val2.$error.pattern)
			{
				state_pohd.Val2.message = "Error : Invalid Data entered. Only Alpha data allowed.";
				return;
			};
		}

		else
		{
			state_pohd.Val2.valid = true;
			state_pohd.Val2.message = "";
		};
	};

	// Validate Val3
    $scope.onValidate_Val3 = function () {
		if ($scope.myForm.Val3.$invalid)
		{
			state_pohd.Val3.valid = false;
			state_pohd.Val3.message = "Error : Invalid Data entered.";

			if ($scope.myForm.Val3.$error.pattern)
			{
				state_pohd.Val3.message = "Error : Invalid Data entered. Only Digits allowed.";
				return;
			};
		} 

		else
		{
			if (parseInt($scope.pohd.Val3) < 5 || parseInt($scope.pohd.Val3) > 15)
			{
				state_pohd.Val3.valid = true;
				state_pohd.Val3.message = "Error : Value must be between 5 and 15";
				return;
			};

			state_pohd.Val3.valid = true;
			state_pohd.Val3.message = "";
		};		
	};

	// Validate Val4
    $scope.onValidate_Val4 = function () {
		if ($scope.myForm.Val4.$invalid)
		{
			state_pohd.Val4.valid = false;
			state_pohd.Val4.message = "Error : Invalid Data entered.";

			if ($scope.myForm.Val4.$error.pattern)
			{
				state_pohd.Val4.message = "Error : Invalid Data entered. Only Numeric data allowed.";
				return;
			};

		} 
		else
		{
			state_pohd.Val4.valid = true;
			state_pohd.Val4.message = "";
		};		
	};

	// Validate Val5
    $scope.onValidate_Val5 = function () {
		if ($scope.myForm.Val5.$invalid)
		{
			state_pohd.Val5.valid = false;
			state_pohd.Val5.message = "Error : Invalid Data entered.";

			if ($scope.myForm.Val5.$error.pattern)
			{
				state_pohd.Val5.message = "Error : Invalid Data entered. Only Alpha-numeric data allowed.";
				return;
			};
		}
		else
		{
			state_pohd.Val5.valid = true;
			state_pohd.Val5.message = "";
		};
	};

}]);

// Directive to capitalize data
/*DocApp.directive('capitalize', function(){
	// Runs during compile
	return {
		require: 'ngModel',
		restrict: 'A',
		link: function(scope, element, attrs, modelCtrl) {
			var capitalize = function (inputValue) {
//			alert("Hi!! I am in the directive");
				var capitalized = inputValue.toUpperCase();
				if (capitalized !== inputValue) {
					modelCtrl.$setViewValue(capitalized);
					modelCtrl.$render();
				}
				return capitalized;
			}
			modelCtrl.$parsers.push(capitalize);
			capitalize(scope[attrs.ngModel]);
		}
	};
});
*/

DocApp.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/', 
			{
				controller: 'DocVisitCtrl',
				templateUrl: 'DocQuery.html'
			})

		.when('/DocTx1',
			{
				controller: 'DocVisitCtrl',
				templateUrl: 'DocTx1.html'
			})

		.when('/DocVisAdd', 
			{
				controller: 'DocVisAddCtrl',
				templateUrl: 'DocVisAdd.html'
			})

		.otherwise(
			{
				redirectTo: '/'
			});
}]);