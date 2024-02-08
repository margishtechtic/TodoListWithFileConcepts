import os


class TodoLibrary():
    def __init__(self):
        self.title_list = []
        print("\t\t==========Welcome to TODO App==========")

        while(True):
            print('''
                    1. Create Todo\n
                    2. Read Todo Content\n
                    3. Delete Todo File\n
                    4. Update Todo Content\n
                    5. Show Todo List\n
                    6. Exit Program\n''')
            

            option = input('Enter Your Choice')
            print("=========================")
            match(option):
                case '1':
                    self.createTodo()
                    continue
                case '2':
                    self.readTodo()
                    continue
                case '3':
                    self.deleteTodo()
                    continue
                case '4':
                    self.updateTodo()
                    continue
                case '5': 
                    self.showTodo()
                    continue
                case '6':
                    exit()
                case _:
                    print("Invalid Option")
                    continue


    def createTodo(self):
        title = input('Enter Task Todo: ')
        content = input('Enter Todo Content: ')

        if(title not in self.title_list):
            self.title_list.append(title)
            fs = open(f"{title}.txt", "w+")
            fs.write(content)
            fs.close()
            print("Todo File created Sucessfully!")
            print("=========================")
        else:
            print("File for ths todo already exist.")
            print("=====")

        
    def  readTodo(self):
        self.showTodo()
        filenumber = int(input('Enter Todo Number to read: '))
        if(filenumber>0 and filenumber <= len(self.title_list)):
            print("Todo Contents:\n")
            fp = open(f"{self.title_list[filenumber-1]}.txt","r")
            print(fp.read())

        else:
            print("Invalid Todo File Number")
            print("=======")



    def  deleteTodo(self):
        self.showTodo()
        num = int(input("Enter the number of the todo )file you want to delete: "))
        if(self.title_list[num-1]):
            os.remove(f"{self.title_list[num-1]}.txt")
            del self.title_list[num-1]
            
        else:
            print("No such Todo found ")
            print("========")


    def updateTodo(self):
        self.showTodo()
        index = int(input('Enter the number of the item you want to modify: '))
        if(index >= 1 and index  <=len(self.title_list)):
            newcontent = input("enter new content")
            fp = open(f"{self.title_list[index-1]}.txt",'w')
            fp.write(newcontent)
            print("Content Updated Successfully!")

        else:
            print("Index out of range")

        
    def showTodo(self):
        print("List of Todo: ")
        for i in range(len(self.title_list)):
            print(f"{i+1}- {self.title_list[i]}")




fileObject = TodoLibrary()



