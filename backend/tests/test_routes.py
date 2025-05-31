import pytest
from main import app, db


@pytest.fixture(scope="session", autouse=True)
def setup_database():
    with app.app_context():
        db.create_all()
        yield
        db.drop_all()


@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


# Sample test if /teas returns 200
def test_get_teas(client):
    response = client.get("/teas")
    assert response.status_code == 200
    assert "teas" in response.get_json()
