# **System Description**

Chess players, especially those who frequently play offline, may be frustrated that they do not have an easy way to keep track of their own statistics and that of other players absent the systems often present in online platforms.  Our product will help chess players track items such as performance metrics and common openings.  This will eliminate the necessity to memorize or take meticulous notes on player habits, general skill levels, and othe attributes.  

The user can create **Player** profiles using the **New Player** feature and enter their *name*, *elo*, and *winrates* for both white and black.  **Modify Player** ***inherits*** the information from **New Player** and allows the user to enter ongoing and more detailed information on them, including information like the person's *playstyle*.  This information is used by the **Player analysis** and subsequently **Strategies**, which includes more obscure information and analysis, like how well they play the *lategame*, for example. The information for common player openings is ***taken*** from the **opening** information on the site.  The top 100 **players** (or however many we end up deciding) are ***listed*** on the **leaderboard** along with the basic *information* from the **Player** class.  The list of all **Players** also ***populates*** the site's searchable list of players, allowing users to **Search** players by name.

# **Conceptual Model**

![image][
