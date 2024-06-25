import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

let posts = [
    {
        id: 1,
        title: "Chess pasta",
        content:
            "Firstly take a pan boil water then add some few drops of oil as well as some salt then add pasta to boil it Then chop all the veggies as pet available and taste Then the pasta boil it wash out with cold water In a small saucepan, saute onion in oil until tender. Add garlic; cook 1 minute longer. Stir in the tomatoes, basil, oregano, sugar, and pepper. Bring to a boil. also, add all the sauces vinegar and sauces moyonies then over with a chess slide then covered it with plate Reduce heat; simmer, uncovered, for 15 minutes. Drain pasta; stir into saucepan. Transfer to a greased 1-qt. baking dish.  Top with cheeses. Bake, uncovered, at for 10-15 minutes or until cheese is melted. 6Now ready to serve delicious pasta",
            author: "Merry",
            date: "2024-06-22T14:30:00Z",
    },
    {
        id: 2,
        title: "Chess-board Cookies",
        content: 
        "In a bowl add maida, baking powder & salt, mix it and keep it aside. In another bowl ghee/butter and powdered sugar and whisk it till the mixture becomes light and fluffy. Now mix it with dry ingredients and form a dough. Now divide the dough into two equal parts. Now add cocoa powder and coffee powder in one dough, Knead it & mix them Again cut each sides vertically. Now alternately place one above the other Repeat the same with the second batch and stick all of them by gently pressing them.Now again wrap it and keep it in a refrigerator for 15 mins. then cut them into peices keeping half inch of thickness. Pre-heat a kadai & grease a plate with oil and put all the cookie-cuts over the plate and bake them for 25 in a low flame. Consume them after 15 mins after removing them..",
        author: "Jenny",
        date: "2024-6-22T14:30:00Z",
    },
    {
        id: 3,
        title: "Chess with truffle cake",
        content: 
        "In a bowl, whisk together curd and sugar until the sugar dissolves. now, sieve baking powder and baking soda and whisk again. Leave the mixture for 5 mins. The mixture rises and becomes frothy. Now and oil little by little and whisk add essence. Sieve maida and salt. Add dry ingredients to wet mixture in batches and mix cut and fold method. Then we divide the batter into two halves and add cocoa powder in one part. Then we prepare the mold. After that, we pour the batter into them. We pre-heat the tandoor on low flame for about10 mins. Then bake the cake for 40 mins. And for confirmation, we check it with a toothpick. In a bowl take the ingredients together and microwave it for 30 sec and stirring it till there are no lumps. And for a better outcome leave it overnight. After the cakes are baked we divide the cakes into two halves. Cut the cake into different sizes of circles and then arrange them in alternate colors",
        author: 'Nancy',
        date: "2024-06-22T09:15:00Z",
    },
];

let lastId = 3;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/posts", (req, res) => {
    console.log(posts);
    res.json(posts);
});

app.get("/posts/:id", (req, res) => {
    const post = posts.find((p) => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).json({ message: "Post Not Found" });
    res.json(post);
});

app.post("/posts",(req, res) =>{
    const newId = lastId +=1;
    const post = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        date: new Date(),
    };
    lastId = newId;
    posts.push(post);
    res.status(201).json(post);
});

app.patch("/posts/:id",(req, res) => {
    const post = posts.find((p) => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).json({ message: "Post Not Found"});

    if (req.body.title) post.title = req.body.title;
    if (req.body.content) post.content = req.body.content;
    if (req.body.author) post.author = req.body.author;

    res.json(post);
});


app.delete("/posts/:id", (req, res)=> {
    const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Post not Found" });
    
    posts.splice(index, 1);
    res.json({ message: "Post Deleted" });
});

app.listen(port, () => {
    console.log(`Api Is Running at http://localhost:${port}`);
});