// Let us open our database
var DBOpenRequest = window.indexedDB.open('toDoList', 4);

DBOpenRequest.onsuccess = function (event) {
  console.log('<li>Database initialised.</li>');

  // store the result of opening the database in the db variable. This is used a lot below
  db = DBOpenRequest.result;

  // Run the addData() function to add the data to the database
  addData();
};

function addData() {
  // Create a new object ready for being inserted into the IDB
  var newItem = [
    {
      taskTitle: 'Walk dog',
      hours: 19,
      minutes: 30,
      day: 24,
      month: 'December',
      year: 2013,
      notified: 'no',
    },
  ];

  // open a read/write db transaction, ready for adding the data
  var transaction = db.transaction(['toDoList'], 'readwrite');

  // report on the success of opening the transaction
  transaction.oncomplete = function (event) {
    console.log('<li>Transaction completed: database modification finished.</li>');
  };

  transaction.onerror = function (event) {
    console.log('<li>Transaction not opened due to error. Duplicate items not allowed.</li>');
  };

  // create an object store on the transaction
  var objectStore = transaction.objectStore('toDoList');

  // add our newItem object to the object store
  var objectStoreRequest = objectStore.add(newItem[0]);

  objectStoreRequest.onsuccess = function (event) {
    // report the success of our new item going into the database
    console.log('<li>New item added to database.</li>');
  };
}