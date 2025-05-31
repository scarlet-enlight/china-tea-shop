import pytest
from main import app, db


@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


@pytest.fixture(scope="session", autouse=True)
def setup_database():
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
    # Change it SEPARATE test configuration and production LATER
    app.config["TESTING"] = True
    with app.app_context():
        db.create_all()
        yield
        db.drop_all()


# Sample test if /teas returns 200
def test_get_teas(client):
    response = client.get("/teas")
    assert response.status_code == 200
    assert "teas" in response.get_json()
