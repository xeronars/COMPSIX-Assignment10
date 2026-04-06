const bcrypt = require('bcryptjs');
const { db, User, Task } = require('./setup');

async function seedDatabase() {
    try {
        // Force sync to reset database
        await db.sync({ force: true });
        console.log('Database reset successfully.');

        // Create sample users
        const hashedPassword = await bcrypt.hash('password123', 10);
        
        const users = await User.bulkCreate([
            {
                name: 'John Doe',
                email: 'john@example.com',
                password: hashedPassword
            },
            {
                name: 'Jane Smith',
                email: 'jane@example.com',
                password: hashedPassword
            },
            {
                name: 'Mike Johnson',
                email: 'mike@example.com',
                password: hashedPassword
            }
        ]);

        // Create sample tasks
        await Task.bulkCreate([
            // John's tasks
            {
                title: 'Complete project documentation',
                description: 'Write comprehensive documentation for the API project',
                priority: 'high',
                completed: false,
                userId: users[0].id
            },
            {
                title: 'Review code changes',
                description: 'Review pull requests from team members',
                priority: 'medium',
                completed: true,
                userId: users[0].id
            },
            {
                title: 'Update dependencies',
                description: 'Update all npm packages to latest versions',
                priority: 'low',
                completed: false,
                userId: users[0].id
            },
            
            // Jane's tasks
            {
                title: 'Design new user interface',
                description: 'Create mockups for the new dashboard design',
                priority: 'high',
                completed: false,
                userId: users[1].id
            },
            {
                title: 'Test API endpoints',
                description: 'Perform comprehensive testing of all API endpoints',
                priority: 'medium',
                completed: false,
                userId: users[1].id
            },
            {
                title: 'Setup CI/CD pipeline',
                description: 'Configure automated testing and deployment',
                priority: 'high',
                completed: true,
                userId: users[1].id
            },
            
            // Mike's tasks
            {
                title: 'Database optimization',
                description: 'Optimize database queries for better performance',
                priority: 'medium',
                completed: false,
                userId: users[2].id
            },
            {
                title: 'Security audit',
                description: 'Perform security audit of the application',
                priority: 'high',
                completed: false,
                userId: users[2].id
            },
            {
                title: 'Write unit tests',
                description: 'Add unit tests for all API endpoints',
                priority: 'medium',
                completed: true,
                userId: users[2].id
            },
            {
                title: 'Deploy to production',
                description: 'Deploy the application to production environment',
                priority: 'high',
                completed: false,
                userId: users[2].id
            }
        ]);

        console.log('Database seeded successfully!');
        console.log('Sample users created:');
        console.log('- john@example.com / password123');
        console.log('- jane@example.com / password123');
        console.log('- mike@example.com / password123');
        console.log('Total tasks created:', await Task.count());
        
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await db.close();
    }
}

seedDatabase();