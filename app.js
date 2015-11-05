process.env.AZURE_STORAGE_ACCOUNT = "INSERT YOURS";
process.env.AZURE_STORAGE_ACCESS_KEY = "INSERT YOURS";
process.env.AZURE_STORAGE_CONNECTION_STRING = "INSERT YOURS";

var azure = require("azure-storage");
var tableService = azure.createTableService();
var uuid = require("node-uuid");

tableService.createTableIfNotExists("tweets", function(err, result, response) {
	if(!err) {
		console.log("Table tweets ready to use");
	} else {
		console.error("Error occurred while trying to create or access table");
		console.dir(err);
		process.exit(-1);
	}
});


var eg = azure.TableUtilities.entityGenerator;

var tweet = {
	PartitionKey: eg.String("november"),
	RowKey: eg.String(uuid.v1()),
	description: eg.String("some tweet text would be here"),
	dueDate: eg.DateTime(new Date(Date.now()))
};

tableService.insertEntity("tweets", tweet, function(err, result, response) {
	if(!err) {
		console.log("Successfully added tweet to tweets table");
		console.dir(tweet);
	} else {
		console.error("Error occurred while trying to insert tweet");
		console.dir(tweet);
	}
});
