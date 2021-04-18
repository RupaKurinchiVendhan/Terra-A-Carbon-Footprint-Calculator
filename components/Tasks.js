class Task{
    text;
    description;
    picture;
    done = false;
    category;

    constructor(text, description, picture, category)
    {
        this.text = text;
        this.description = description;
        this.picture = picture;
        this.category = category;
    }

    get status()
    {
        return this.done;
    }
    get text()
    {
        return this.text;
    }
    get description()
    {
        return this.description;
    }
    get picture()
    {
        return this.picture
    }
    get category()
    {
        return this.category;
    }

    finish_task()
    {
        done = true;
    }
}

var task1 = new Task(
    'Eat lower on the food chain',
    "14.5% of global greenhouse gas emissions can be attributed to the livestock industry from sources such as feed production, clearing land, and methane emissions from the animals themselves.",
    './assets/eat.png',
    'Consumption/Waste');
var task2 = new Task(
    'Eat on smaller plates to limit portion sizes and eliminate food waste.',
    "A study performed by Roskilde University revealed that if the plate size is reduced by just 9%, the food waste can be reduced by over 25%. In other words, by reducing the size of the plate, you ensure that you don't over feed yourself or the trash bin!",
    './assets/plate.png',
    'Consumption/Waste');
var task3 = new Task(
    'Eat locally-grown foods and produce.',
    "Reduce the emissions from transport while supporting your local farmers and businesses!",
    './assets/produce.png',
    "Consumption/Waste");
var task4 = new Task(
    'Use your food waste as compost.',
    "Composting helps reduce food waste, decreasing the fossil fuel consumption from waste transportation and the emission of greenhouse gases from decomposition in a landfill.",
    './assets/compost.png',
    'Consumption/Waste');
var task5 = new Task(
    'Buy a reusable water bottle.',
    "The production of single-use plastic bottles is reported to release 2.5 million tons of carbon dioxide into the atmosphere every year.",
    './assets/bottle.png',
    'Consumption/Waste');
var task6 = new Task(
    "Donate clothes that you don't need and repurpose un-donatable ones.",
    "Help reduce the methane emitted from decomposition of clothes in landfills while helping someone in need or crafting a fun DIY.",
    './assets/clothes.png',
    'Consumption/Waste');
var task7 = new Task(
    'Research the companies you purchase from.',
    "It helps to support and buy from companies that are environmentally responsible and sustainable. Energy Star products offer a wide variety of appliances that are certified to be more energy efficient.",
    './assets/bulbs.png',
    'Consumption/Waste');
var task8 = new Task(
    'Use reusable bags when shopping.',
    "Reusable bags are an easy way to reduce various sources of carbon emissions that accompany he waste management process.",
    './assets/recycle.png',
    'Consumption/Waste');
var task9 = new Task(
    'Replace all light bulbs in your home with LEDs.',
    "LEDs waste less energy and last longer, so even though they are more expensive up front, they will be beneficial both the environment and your wallet in the long term!",
    './assets/bulbs.png',
    'Utilities');
var task10 = new Task(
    'Turn off lights and unplug electronic devices when not in use.',
    "These small actions can help to greatly reduce any energy waste in your home.",
    './assets/bulbs.png',
    'Utilities');
var task11 = new Task(
    'Properly insulate and seal your home.',
    "Reducing drafts and air leaks will prevent any unnecessary heating and cooling that could waste energy in your home.",
    './assets/bulbs.png',
    'Utilities');
var task12 = new Task(
    'Avoid unnecessary braking and acceleration when driving.',
    "It has been shown that smoother and calmer driving reduces fuel consumption and accompanying emissions when on the road.",
    './assets/walk.png',
    'Transportation');
var task13 = new Task(
    'Keep your car maintenance up to date.',
    "Taking care of your car increases fuel efficiency and reduces unnecessary emissions.",
    './assets/walk.png',
    'Transportation');
var task14 = new Task(
    'Take other modes of transportation instead of driving or try to carpool.',
    "These alternatives can either completely cut the harmful emissions from your trip or at least decrease the fuel consumption per person on the vehicle.",
    './assets/walk.png',
    'Transportation');
var task15 = new Task(
    'Fly economy.',
    "Economy is the least harmful to the environment because the fuel consumption per person transported is much lower than the business and first classes.",
    './assets/shipping.png',
    'Transportation');
var task16 = new Task(
    'Donate to a climate science organization.',
    'If you have the means to donate to climate change charities, consider contributing to research and raising awareness. Some high-imact, evidence-based, cost-effective organizations include The Coalition for Rainforest Nations, Clean Air Task Force, The Information Technology and Innovation Foundation, Rainforest Foundation US, Sandbag, and The Climate Emergency Fund.',
    './assets/donate.png',
    'Miscellaneous');
