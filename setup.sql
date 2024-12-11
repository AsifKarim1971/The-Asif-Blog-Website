-- Createing the categories & articles table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL
);

CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category INTEGER REFERENCES categories(id),
    featureImage VARCHAR(255),
    published BOOLEAN DEFAULT FALSE,
    postDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Populating the categories & articles tables
INSERT INTO categories (id, name, image) VALUES
(1, 'Technology', '/images/Technology.jpg'),
(2, 'Lifestyle', '/images/Lifestyle.webp'),
(3, 'Science', '/images/Science.jpg'),
(4, 'Health', '/images/Health.jpg'),
(5, 'Business', '/images/Business.jpg');


INSERT INTO articles (id, title, content, category, featureImage, published, postDate) VALUES
(1, 'The Smart Way to Start Your Day: How Tech Can Boost Your Morning Routine', 
'Technology has become an indispensable part of our daily lives, and incorporating it into our morning routine can make a significant difference. From smart alarm clocks that track sleep patterns and wake you up at the optimal time to productivity apps that help you organize your day, there are countless ways to streamline your mornings. Devices like smart speakers can offer news briefings, weather updates, or even set reminders as you sip your coffee. Health and wellness tools, such as fitness trackers or meditation apps like Calm, can also enhance your physical and mental well-being, setting a positive tone for the rest of the day. By embracing these tech tools, you can transform your mornings from stressful to productive and fulfilling, ensuring that each day starts on the right foot.', 
1, '/images/articles-1.jpg', true, '2024-11-25T12:19:54.230Z'),
(2, 'Tech for Mental Health: How Apps Are Supporting Emotional Well-Being', 
'Mental health is a critical aspect of overall wellness, and technology is stepping up to offer valuable support in this area. From mindfulness apps like Headspace and Calm, which guide users through meditation sessions, to platforms like BetterHelp and Talkspace that connect individuals with professional therapists, there are now more accessible tools than ever for managing emotional well-being. Journaling apps such as Daylio or Journey encourage daily reflection and self-care, while mood trackers like Moodfit help users understand and regulate their emotions over time. These digital solutions provide a convenient, private, and effective way to prioritize mental health, giving individuals the power to improve their emotional wellness from anywhere at any time.', 
2, '/images/articles-2.jpg', true, '2024-11-25T12:19:54.230Z'),
(3, 'Building a Tech-Savvy Home: Must-Have Gadgets for a Smarter Lifestyle', 
'The rise of smart home technology has revolutionized the way we live, offering convenience, security, and efficiency in our day-to-day routines. Devices like Amazon Echo and Google Home serve as control hubs, allowing you to manage lighting, temperature, and entertainment with voice commands. Smart lighting systems, such as Philips Hue, can create custom atmospheres while saving energy, and smart security systems like Ring or Nest offer peace of mind with live video feeds and alerts. Additionally, appliances like smart refrigerators, thermostats, and robotic vacuum cleaners streamline household chores and help you manage tasks more efficiently. By adopting these smart technologies, you can transform your living space into a highly functional, tech-powered haven.', 
3, '/images/articles-3.jpg', false, '2024-11-25T12:19:54.230Z'),
(4, 'Balancing Digital and Real Life: How to Unplug in a Hyper-Connected World', 
'While technology has made life more convenient, it’s essential to strike a balance between our digital and real-world experiences to avoid burnout. A digital detox—taking time away from screens—can help you reset and recharge, while tools like Apple’s Screen Time and Android’s Digital Wellbeing allow you to monitor and manage your usage. Setting boundaries, such as limiting phone use during meals or before bed, can improve mindfulness and reduce stress. Engaging in offline activities like hiking, reading, or spending quality time with loved ones can also provide a refreshing break from the hyper-connected world we live in. By intentionally unplugging, you can foster a healthier relationship with technology and lead a more balanced, present life.', 
4, '/images/articles-4.jpg', true, '2024-11-25T12:19:54.230Z'),
(5, 'Tech-Savvy Parenting: Raising Digital Natives in a Safe and Healthy Way', 
' Discuss the challenges and opportunities of raising children in a digital age. Explore topics like screen time limits, online safety, and using technology for educational purposes. Offer practical tips for parents to guide their children''s digital experiences.', 
5, '/images/articles-5.jpg', true, '2024-11-25T12:19:54.230Z'),
(6, 'The Future of Work: How Technology is Transforming the Job Market', 
'Analyze the impact of automation and artificial intelligence on various industries. Discuss the skills that will be in high demand in the future and explore strategies for adapting to a changing job market. Offer advice on lifelong learning and upskilling to stay relevant in the tech-driven workplace.', 
2, '/images/articles-6.jpg', true, '2024-11-25T12:19:54.230Z'),
(7, 'Technology in our daily life: Mindfulness in the Digital Age', 
'In a world increasingly dominated by technology, finding moments of peace and tranquility can be challenging. Mindfulness practices offer a valuable tool to navigate the digital age and maintain a balanced lifestyle. This article explores the benefits of mindfulness, including stress reduction, improved focus, and enhanced emotional well-being. It provides practical tips and techniques for incorporating mindfulness into daily life, such as meditation, deep breathing exercises, and mindful eating. Additionally, the article discusses strategies for managing digital overload and creating healthy boundaries between technology and personal time.', 
3, '/images/articles-7.jpg', true, '2024-11-25T12:19:54.230Z'),
(8, 'New Post', 
'Hello', 
5, 'http://res.cloudinary.com/dnueerhxl/image/upload/v1732517053/iaqlf0cjh19qr5yifmee.png', 
false, '2024-11-25T12:19:54.230Z'),
(9, 'This is a test post', 
'Okay, lets see', 
3, 'http://res.cloudinary.com/dnueerhxl/image/upload/v1732517128/pkkiposczsdjbandzeme.jpg', 
false, '2024-11-25T12:19:54.230Z'),
(10, 'This is a PUBLISHED post', 
'Yes, this one is the ONE!', 
3, 'http://res.cloudinary.com/dnueerhxl/image/upload/v1732517182/hz7mu868muws4hiuto6a.jpg', 
true, '2024-11-25T12:19:54.230Z'),
(11, 'This is a new post!', 
'Okay, lets if it works or not.', 
3, 'http://res.cloudinary.com/dnueerhxl/image/upload/v1732517888/u6mdv9councek8hwhkws.jpg', 
true, '2024-11-25T12:19:54.230Z'),
(12, 'Category Name', 
'Is it there', 
1, 'http://res.cloudinary.com/dnueerhxl/image/upload/v1732534504/qh0xf6g5uvf0rkjot97v.jpg', 
true, '2024-11-25T12:19:54.230Z'),
(13, 'Business is Business', 
'Give me money ', 
5, 'http://res.cloudinary.com/dnueerhxl/image/upload/v1732536067/p0ad68qzpuzemekvotxo.jpg', 
true, '2024-11-25T12:19:54.230Z'),
(14, 'This is to show date', 
'Is the date there', 
1, 'http://res.cloudinary.com/dnueerhxl/image/upload/v1732537193/ujhcvxobwtgj5rjtwxti.png', 
true, '2024-11-25T12:19:54.230Z');


