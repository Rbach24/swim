# swim

# goal:
The goal of this app is to automate the manual tasks of my swim coach, which include taking attendance, storing swimmers' event times and personal bests in an organized manner, and creating line-ups for meets. The MVP of the app would include the attendance feature as well as the organization of swimmers' data; the user (the coach) would be able to edit data as they like. Later versions of the app will include the line-up feature as well as further refinements of the current features. 

# My Journey
As a member of my school's swim team, I wanted to help out my swim coach with the manual tasks mentioned above since they have been taking up a lot of her time. I figured that an app could help a lot with this. To begin creating my app, I had to decide which type of app I would have to build: a native one or a hybrid one. I decided to go with the hybrid app approach, mainly for two reasons: I already knew the core languages needed to build a hybrid app, and I do need to create two separate pieces of code to create the same app on iOS and ANDROID. It is due to both of these reasons that the creation of the app would be much faster, which is beneficial because I intend to get my coach to start using this app by the time the next swim season starts. Hence, I used React Native to build my app. Additionally, I decided that for the time being, as well as the near future, using the user's personal storage rather than a cloud storage in order to store data was more efficient and logical since the data being dealt with does not have much volume.
  Before creating the app, I created an Architecture Diagram (shown below) for my app; this allowed me to understand how different components of my app were related to each other. After doing so, I created the design/layout of the app and made sure all the elements of the app worked before I implemented data storage. While most features were fairly straightforward to code, there were a few obstacles I had to overcome when creating some of them.
  
  One of which was when I was creating the "Edit" functionality for swimmers. The intended goal of this function was to allow the user to change details of any particular swimmer. In order to cut down on "unecessary code" and to save on time, I tried to tweak ```NewSwimmerScreen.js``` to not only serve as a screen to add a new swimmer, but also to edit a pre-existing swimmer. This way, I could have the edit button redirect the user to this screen, which was already built. However, I did not account for the time I would have taken to make those tweaks. Since this was my first time developing a react-native app, there was a lot of trial and error involved before I finally ended up with a code that worked as intended. Eventually, I found out a trick that helped me get past this issue with the help of my mentor : I could use an if-statement to check whether a "swimmer" object existed in route params or not : 
  ``` 
    if (route.params?.swimmer) {
    localState = route.params?.swimmer
    title = swimmerName = localState.title;
    time = swimmerTime = localState.time;
  } 
  else {
    localState = {
      swimmerId: '',
      title: '',
      time: '',
      category: ''
    }
  }
  var newSwimmer = localState;
  ```

  This experienced inspired me to delve more into routing in react native and learn more about it. I created the same functionality for editing a particular indivudal's session details, but this time, I created a new screen instead of using a pre-existing screen; this method of building the edit button made the files feel more organized, which was useful for when I needed to access them.

  I learned about how json schema could be stored using react native, and the important differences between using asynchronous and synchronous functions. I learned the importance of using async/await to store data that required parts of code to be complete before moving on; for example, the ```saveSwimmersToDatabase``` function in ```storageProvider.js``` was made asynchronous, because the function has to wait for all changes made to the swimmers' data before saving it to the database. Without making it asynchrnonous, I noticed that the app did not display updated data while the user was trying to make changes to it.

  Coding all the features was not always straightforward and simple, as I would often come across errors that seemed impossible to occur. I learnt a couple of handy debugging methods that saved me a lot of time that I would have otherwise spent searching online for solutions. For example, with the help of the ```JSON.stringify()``` and the ```console.log()``` functions, I was able to fix many of my problems.

