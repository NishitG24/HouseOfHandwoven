import os
from dotenv import load_dotenv
from crew import EcommerceDevCrew

# 1. Load your API keys and configuration from .env
load_dotenv()

def run_sprint():
    """
    Kicks off a development sprint based on user requirements.
    """
    print("--- Welcome to the AI Ecommerce Dev Team ---")
    
    # 2. Define the requirement for this specific run
    # In a real Agile flow, you change this string for every new feature
    requirement = """
    I have an buisiness of handwoven jewellery and I want to create an online store to sell my products.
    The store should have the following features but as part of my website I dont want user to restrict to account creation only guest checkout should be available.
    and when user clcik on buy now it should send whatsapp message to my buisiness number with product details and user details.
    1. Product Catalog: Display a variety of handwoven jewellery items with images, descriptions, and prices.
    2. Shopping Cart: Allow users to add items to a cart and proceed to checkout.
    3. Guest Checkout: Enable users to complete purchases without creating an account.
    4. WhatsApp Integration: Send order details via WhatsApp to the business owner's number upon purchase.
    5. Responsive Design: Ensure the website is mobile-friendly and works well on all devices.
    6. SEO Optimization: Optimize the site for search engines to attract organic traffic.
    7. Search and Filtering: Implement search functionality and filters to help users find products easily.
    8. Contact Page: Include a page for customers to reach out with inquiries.
    9. Social Media Links: Add links to social media profiles to enhance brand presence.
    10. for Buy Option Allows user to connect to whatsapp or instagram with prefilled message containing product name and price
    11. Basic Analytics: Track visitor behavior and sales performance.
    12. Security Measures: Implement SSL and other security protocols to protect user data.
    13. Admin Panel: Create a simple admin interface to manage products and view orders.
    14: the message should redircte on whatapp number 8602296793 or instagram handle @alive_incolors
    15. The website should be built using React for the frontend and MongoDB for the backend database.
    16. The website should be deployed on Vercel for frontend and MongoDB Atlas for backend.
    17. The code should be version controlled using Git and hosted on GitHub.
    18. should allow user to select multiple products and send a single message containing all product details.
    19. user should have option either to connect via whatsapp or instagram for placing order.
    20. name of my buissness is House of House of HandWoven Jewellery Collection.
    """

    inputs = {
        'requirement': requirement,
        'current_date': '2026-01-30', # Helps agents understand project timeline
        'project_name': 'MyOpenSourceStore'
    }

    try:
        # 3. Initialize the Crew
        # The EcommerceDevCrew class is imported from your crew.py
        my_crew = EcommerceDevCrew().crew()

        # 4. Execute the process
        print(f"Starting Sprint for: {requirement[:50]}...")
        result = my_crew.kickoff(inputs=inputs)

        # 5. Output the results
        print("\n\n########################")
        print("## SPRINT COMPLETED ##")
        print("########################\n")
        print(result)

    except Exception as e:
        print(f"An error occurred during the sprint: {e}")

if __name__ == "__main__":
    run_sprint()