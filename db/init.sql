CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) CHECK (status IN ('Pending', 'In Progress', 'Completed')),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Insert some tasks
INSERT INTO tasks (title, description, status)
VALUES ('Complete Project Proposal', 'Draft and finalize the project proposal for the upcoming semester.', 'Pending');

INSERT INTO tasks (title, description, status)
VALUES ('Develop API Endpoints', 'Work on developing the necessary API endpoints for the new feature.', 'In Progress');

INSERT INTO tasks (title, description, status)
VALUES ('Update Documentation', 'Update the documentation to reflect recent changes and improvements.', 'Completed');
