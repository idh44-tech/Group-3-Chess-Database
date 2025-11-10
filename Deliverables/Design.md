# Description

Our system is a website that allows users to create, update, and view information on chess players.  The site will track values such as elo, winrates, and common openings played.  It will also include useful miscellaneous usefule features such as a page providing information on various chess openings.  The site is targeted primarily towards players who play mostly in-person and don't have access to the information that playing online provides.  

# Architecture

The rationale for the design of our architecture is fairly intuitive.  We have the user interface and the associated logic.  We have the player profiles, and the storage, creation, and modification of them as our "data" layer.  Finally we have another category for other, miscellaneous services included.  

![image](D5_UML_diagram.png)

# Class Diagram

![image](D5_Class_Diagram.png)

# Sequence Diagram

Use case: add a new player

![image](D5_Sequence_Diagram.png)

# Design Patterns

Our system doesn't explicity use any classes so far, so I can't show references to specific classes implementation, but the underlying behavior still aligns with some design patterns, so it can be represented as such.  

## Observer Pattern

![image](D5_Observer_Diagram.png)

## Memento Pattern

![image](D5_Memento_Diagram.png)

# Design Principles

Our system implements both the Separation of Concerns (SoC) principle and the Don't Repeat Yourself (DRY) principle.  The SoC principle dictates that every part of the code should separate out a clear and well-defined functionality.  Our code demonstrates this in the HTML file with the following code:

![image](D5_SoC_example.png)

This code recieves no information about how player information is stored, it just triggers an event and lets the Javascript handle the rest.  The DRY principle is about avoiding repeating code by using loops or functions.  Our code demonstrates this in our JavaScript file with the function autopopulateCards:

![image](D5_DRY_example.png)

The code for rendering the cards is only written once and reused wherever necessary.  
