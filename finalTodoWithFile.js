const fs = require('fs');
const prompt = require('prompt-sync')({sigint : true});
class FileSystem {
    constructor() {
        this.title_list = [];
        console.log("==========Welcome to TODO App==========")
        while(true){
            console.log("\t1.Create Todo\n\t2.Read Todo Content\n\t3.Delete Todo\n\t4.Update Todo\n\t5.Show Todo List\n\t6.Exit");
            let option = prompt("Enter Option Number:");
            console.log("=========================");
            switch (option) {
                case "1":  
                    this.createTodo(); 
                    break;
                case "2":   
                    this.readTodo(); 
                    break;
                case "3":  
                    this.deleteTodo();
                    break;
                case "4":  
                    this.updateTodo();
                    break;
                case "5":
                    this.showTodo();
                    break;
                case "6":
                    console.log("========THANK YOU========");
                    process.exit();
                default :  
                    console.log("Invalid Option!");
                    console.log("=========================");
            }
        }
    }
    createTodo(){
        let title =prompt('Enter Task Todo: ');
        let content = prompt('Enter Todo Content: ')
        if(!this.title_list.includes(title)){
            this.title_list.push(title);
            fs.writeFileSync(`${title}.txt`,content,'utf8',function() {
                console.log("File Created Successfully");
                console.log("=========================");
            });
        }else{
            console.log("File Already Exists with  the same name.")
            console.log("=========================");
        }
    }
    readTodo(){
        this.showTodo()
        let fileNumber = parseInt(prompt("Enter Todo Number to Read: "));
        if(fileNumber>0 && fileNumber<=this.title_list.length){
            console.log("\ Todo Contents:\n",fs.readFileSync(`${this.title_list[fileNumber-1]}.txt`,'utf8'));
            console.log("=========================");
        }else{
            console.log("Invalid Todo File Number");
            console.log("=========================");
        }
    }
    deleteTodo(){
        this.showTodo()
        var num = prompt("Enter the number of the todo file you want to delete:");
        if(this.title_list[num-1]){
            fs.unlinkSync(`${this.title_list[num-1]}.txt`);
            this.title_list.splice(num,1);
            console.log("Todo Deleted successfully!");
            console.log("=========================");
        } else {
            console.log("No such Todo exists.");
            console.log("=========================");
        }    
    }
     updateTodo(){
        this.showTodo()
        var index = parseInt(prompt("Enter the number of the item you want to modify:"));
        if(index>=1&&index<=this.title_list.length) {
            var newContent = prompt('Enter the updated content:');
            fs.writeFileSync(`${this.title_list[index-1]}.tmp`,newContent,'utf8')
            // fs.renameSync(`${this.title_list[index-1]}.tmp`, `${this.title_list[index-1]}.txt`);
            console.log("Update Successful!")
        } else {
            console.log("Index out of bounds.")
        }
    }
    showTodo(){
        const n = this.title_list.length;
        console.log("List of Todos: ");
        for(let i=0;i<n;i++) {
            console.log(`[${i+1}] ${this.title_list[i]}`);
        }

    }
 }


const fileObject = new FileSystem();